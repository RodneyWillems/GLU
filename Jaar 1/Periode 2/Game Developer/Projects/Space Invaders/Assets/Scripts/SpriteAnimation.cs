using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpriteAnimation : MonoBehaviour
{
    // Maakt variabelen aan die je in Unity kan aanpassen voor welke sprites de animatie gebruikt
    // Hoe lang je wilt dat het duurt voordat de volgende sprite gebeurt
    // En of het na 1 keer afspelen kapot moet
    [SerializeField] private Sprite[] sprites;
    [SerializeField] private float fps;
    [SerializeField] private bool playOnceAndDestroy = false;
    // Maakt variabelen aan voor de sprite, timer, interval en de index
    private SpriteRenderer spriteRenderer;
    private float timer;
    private float interval;
    private int index;
    // Start is called before the first frame update
    void Start()
    {
        
    }
    private void Awake()
    {
        // Slaat de SpriteRenderer Component op en berekent de interval
        spriteRenderer = GetComponent<SpriteRenderer>();
        interval = 1f/fps;
    }

    // Update is called once per frame
    void Update()
    {
        // Telt op elke seconde
        timer += Time.deltaTime;
        // Als de timer hetzelfde of groter is als de interval dan veranderd hij de sprite
        if (timer >= interval)
        {
            // Zorgt ervoor dat de sprite veranderd naar de volgende
            spriteRenderer.sprite = sprites[index];
            index++;
            // Als index hoger word dan de aantal sprites die je nodig heb reset het
            if (index == sprites.Length) {
                if (playOnceAndDestroy == true)
                {
                    // Als playOnceAndDestroy aan staat zorgt het ervoor dat nadat het klaar is het word destroyed
                    Destroy(gameObject);
                }
                index = 0;
            }
            timer = 0f;
        }
    }
}
