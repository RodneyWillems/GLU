using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// Een enum voor alle 4 verschillende statussen die de kaart kan hebben
public enum CardStatus
{
    show_back,
    show_front,
    rotating_to_back,
    rotating_to_front
}

public class Cards : MonoBehaviour
{
    [SerializeField] private CardStatus status;
    [SerializeField] private float turnTargetTime = 1f, turnTimer;

    private SpriteRenderer frontRenderer, backRenderer;
    private Quaternion startRotation, targetRotation;
    private Game game;

    private void Awake()
    {
        // Zodra de game opstart word de gameManager gevonden, de sprites gepakt, en de status op show_back gezet
        status = CardStatus.show_back;
        GetFrontAndBackSpriteRenderers();
        game = FindObjectOfType<Game>();
    }

    private void OnMouseUp()
    {
        // Wanneer je op een kaart klikt checkt het eerst of je wel mag selecteren
        // Daarna zorgt het ervoor dat de kaart omdraait en geselecteerd word in de gameManager
        if (game.AllowedToSelectCard(this) == true)
        {
            if (status == CardStatus.show_back )
            {
                TurnToFront();
                game.SelectCard(gameObject);
            }
        }
    }

    public void TurnToFront()
    {
        // Zorgt ervoor dat met een timer de kaart 180 graden omdraait naar de voorkant
        status = CardStatus.rotating_to_front;
        turnTimer = 0;
        startRotation = transform.rotation;
        targetRotation = Quaternion.Euler(0, 180, 0);
    }

    public void TurnToBack()
    {
        // Zorgt ervoor dat met een timer de kaart 180 graden omdraait naar de achterkant
        status = CardStatus.rotating_to_back;
        turnTimer = 0;
        startRotation = transform.rotation;
        targetRotation = Quaternion.Euler(0, 0, 0);
    }

    private void GetFrontAndBackSpriteRenderers()
    {
        // Met een loop word de SpriteRenderer component opgeslagen
        foreach(Transform t in transform)
        {
            if (t.name == "Front")
            {
                frontRenderer = t.GetComponent<SpriteRenderer>();
            }
            else if (t.name == "Back")
            {
                backRenderer = t.GetComponent<SpriteRenderer>();
            }
        }
    }

    public void SetFront(Sprite sprite)
    {
        // Als er een frontRenderer is zet het de goeie sprite neer
        if (frontRenderer != null)
        {
            frontRenderer.sprite = sprite;
        }
    }

    public void SetBack(Sprite sprite)
    {
        // Als er een backRenderer is zet het de goeie sprite neer
        if (backRenderer != null)
        {
            backRenderer.sprite = sprite;
        }
    }

    public Vector2 GetFrontSize()
    {
        // Stuurt de grootte van de frontRenderer terug
        if (frontRenderer == null)
        {
            Debug.LogError("Er is geen frontRenderer gevonden");
        }
        return frontRenderer.bounds.size;
    }
    public Vector2 GetBackSize()
    {
        // Stuurt de grootte van de backRenderer terug
        if (backRenderer == null)
        {
            Debug.LogError("Er is geen backRenderer gevonden");
        }
        return backRenderer.bounds.size;
    }

    void Update()
    {
        // Als de status draaien naar voren of naar achteren is zorgt het ervoor dat het draait
        if (status == CardStatus.rotating_to_front || status == CardStatus.rotating_to_back ) 
        {
            // Het draait met een timer zodat het niet instant omdraait maar met een mooie animatie dankzij Slerp
            turnTimer += Time.deltaTime;
            float percentage = turnTimer / turnTargetTime;
            transform.rotation = Quaternion.Slerp( startRotation, targetRotation, percentage ); 
            if (percentage >= 1f)
            {
                // Na het omdraaien zet het de goeie status neer
                if (status == CardStatus.rotating_to_back)
                {
                    status = CardStatus.show_back;
                }
                else if (status == CardStatus.rotating_to_front)
                {
                    status = CardStatus.show_front;
                }
            }
        }
    }
}
