using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UIElements;

// Een enum voor alle 4 verschillende statussen die er kunnen zijn
public enum GameStatus
{
    waiting_on_first_card,
    waiting_on_second_card,
    match_found,
    no_match_found
}

public class Game : MonoBehaviour
{
    [SerializeField] private int rows = 3, columns = 4;
    [SerializeField] private float totalPairs, offsetX, offsetY, timeoutTarget;
    [SerializeField] private string frontsidesFolder = "Sprites/Frontsides/", backsidesFolder = "Sprites/Backsides/";
    [SerializeField] private Sprite[] frontSprites, backSprites;
    [SerializeField] private GameObject cardPrefab;
    [SerializeField] private Transform fieldAnchor;
    [SerializeField] private GameObject winScreen, startScreen;

    private List<Sprite> selectedFrontSprites;
    private Sprite selectedBackSprite;
    private Stack<GameObject> stackOfCards;
    private GameObject[,] placedCards;
    private GameStatus status;
    private GameObject[] selectedCards;
    private float timeoutTimer;

    private void Awake()
    {
        // Wanneer je de game opent start Awake() die het winScreen uit zet
        winScreen.SetActive(false);
    }

    public void StartGame()
    {
        // Wanneer je op de Start knop drukt worden alle kaarten aangemaakt en begint de game
        startScreen.SetActive(false);
        MakeCards();
        DistributeCards();
        selectedCards = new GameObject[2];
        status = GameStatus.waiting_on_first_card;
    }

    private void MakeCards()
    {
        // Roept alle functies achter elkaar aan zodat het er leesbaarder bij staat
        CalculateAmountOfPairs();
        LoadSprites();
        SelectFrontSprites();
        SelectBackSprites();
        ConstructCards();
    }

    private void CalculateAmountOfPairs()
    {
        // Berekent hoeveel paren er zijn en als er een oneven aantal kaarten zijn is er een error
        if (rows * columns % 2 == 0)
        {
            totalPairs = rows * columns / 2;
        }
        else
        {
            Debug.LogError("Geen even paren");
        }
    }
    private void LoadSprites()
    {
        // Laad alle sprites in 
        frontSprites = Resources.LoadAll<Sprite>(frontsidesFolder);
        backSprites = Resources.LoadAll<Sprite>(backsidesFolder);
    }

    private void SelectFrontSprites()
    {
        // Selecteerd random frontSprites voor op de kaarten
        if (frontSprites.Length < totalPairs)
        {
            Debug.LogError("Er zijn te weinig plaatjes om " + totalPairs + " paren te maken");
        }
        selectedFrontSprites = new List<Sprite>();
        while (selectedFrontSprites.Count < totalPairs)
        {
            int rnd = Random.Range(0, frontSprites.Length);
            if (selectedFrontSprites.Contains(frontSprites[rnd]) == false)
            {
                selectedFrontSprites.Add(frontSprites[rnd]);
            }
        }
    }

    private void SelectBackSprites()
    {
        // Selecteerd een random backSprite om op de kaart te zetten
        if (backSprites.Length > 0)
        {
            int rnd = Random.Range(0, backSprites.Length);
            selectedBackSprite = backSprites[rnd];
        }
        else
        {
            Debug.LogError("Er zijn geen achterkant plaatjes om te selecteren");
        }
    }

    private void ConstructCards()
    {
        // Eerst maak je een nieuwe stack aan om dan de kaarten erop te leggen
        stackOfCards = new Stack<GameObject>();
        // Met de loops maken we alle kaarten aan en zetten we ze op de stack
        foreach(Sprite selectedFrontSprite in selectedFrontSprites)
        {
            for (int i = 0; i < 2; i++) 
            {
                GameObject go = Instantiate(cardPrefab);
                Cards cardScript = go.GetComponent<Cards>();

                cardScript.SetBack(selectedBackSprite);
                cardScript.SetFront(selectedFrontSprite);

                go.name = selectedFrontSprite.name;

                stackOfCards.Push(go);
            }
        }
    }

    private void DistributeCards()
    {
        // Maakt eerst een nieuwe 2D array aan en roept daarna de functies aan om de kaarten randomly neer te zetten
        placedCards = new GameObject[columns, rows];
        ShuffleCards();
        PlaceCardsOnField();
    }

    private void ShuffleCards()
    {
        // Zolang er kaarten op de stack liggen krijgen ze een random plek in de 2D array
        while (stackOfCards.Count > 0)
        {
            int randX = Random.Range(0, columns);
            int randY = Random.Range(0, rows); 
            if (placedCards[randX, randY] == null)
            {
                placedCards[randX, randY] = stackOfCards.Pop();
            }
        }
    }

    private void PlaceCardsOnField()
    {
        // Met de 2 loops worden de kaarten gepakt uit de array en naast elkaar neergezet
        for (int y = 0; y < rows; y++)
        {
            for (int x = 0; x < columns; x++)
            {
                GameObject card = placedCards[x, y];
                Cards cardScript = card.GetComponent<Cards>();

                Vector2 cardSize = cardScript.GetBackSize();

                float posX = fieldAnchor.position.x + (x * (cardSize.x + offsetX));
                float posY = fieldAnchor.position.y + (y * (cardSize.x + offsetY));

                placedCards[x, y].transform.position = new Vector3(posX, posY, 0f);
            }
        }
    }

    public void SelectCard(GameObject card)
    {
        // Als de eerste kaart nog niet geselecteerd is kan die worden geselecteerd en hetzelfde met de tweede kaart
        if (status == GameStatus.waiting_on_first_card)
        {
            selectedCards[0] = card;
            status = GameStatus.waiting_on_second_card;
        }
        else if (status == GameStatus.waiting_on_second_card)
        {
            // Wanneer er 2 kaarten zijn geselecteerd word er gekeken of het een matching paar is
            selectedCards[1] = card;
            CheckForMatchingPair();
        }
    }

    private void CheckForMatchingPair()
    {
        // De timeoutTimer word gereset zodat er een korte tijd is voordat het echt gechecked word
        timeoutTimer = 0f;
        if (selectedCards[0].name == selectedCards[1].name)
        {
            // Als de 2 kaarten dezelfde naam hebben word de status match_found gezet 
            status = GameStatus.match_found;
        }
        else
        {
            status = GameStatus.no_match_found;
        }
    }

    private void RotateBackOrRemovePair()
    {
        // De timeoutTimer word opgeteld zodat er een korte tijd is om te zien wat je heb aangeklikt
        timeoutTimer += Time.deltaTime;
        if (timeoutTimer >= timeoutTarget)
        {
            if (status == GameStatus.match_found)
            {
                // Als er een match found is worden de 2 kaarten verwijderd en totalPairs gaat omlaag
                // Wanneer totalPairs 0 is heb je gewonnen omdat er niks over is en gaat het win scherm aan
                Destroy(selectedCards[0]);
                Destroy(selectedCards[1]);
                totalPairs--;
                if (totalPairs == 0)
                {
                    winScreen.SetActive(true);
                }
            }
            else if (status == GameStatus.no_match_found)
            {
                // Als er geen match gevonden is worden allebei de kaarten terug gedraaid
                selectedCards[0].GetComponent<Cards>().TurnToBack();
                selectedCards[1].GetComponent<Cards>().TurnToBack();
            }
            // Na het checken worden de geselecteerde kaarten gereset en de status terug naar wachten
            selectedCards[0] = null;
            selectedCards[1] = null;
            status = GameStatus.waiting_on_first_card;
        }
    }

    public bool AllowedToSelectCard(Cards card)
    {
        // Deze functie zorgt ervoor dat je niet constant alle kaarten kan aanklikken
        if (selectedCards[0] == null)
        {
            return true;
        }
        else if (selectedCards[1] == null)
        {
            if (selectedCards[0] != card.gameObject)
            {
                return true;
            }
        }
        return false;
    }

    public void ResetGame()
    {
        // Wanneer je op de reset knop drukt word alles weer opnieuw gemaakt zoals in StartGame()
        winScreen.SetActive(false);
        MakeCards();
        DistributeCards();
        selectedCards = new GameObject[2];
        status = GameStatus.waiting_on_first_card;
    }

    void Update()
    {
        // Na het checken of er een match is worden de kaarten of terug gedraaid of verwijderd
        if (status == GameStatus.match_found || status == GameStatus.no_match_found)
        {
            RotateBackOrRemovePair();
        }
    }
}
