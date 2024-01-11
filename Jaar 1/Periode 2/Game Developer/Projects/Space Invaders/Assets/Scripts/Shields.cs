using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Shields : MonoBehaviour
{
    [SerializeField] private Sprite[] sprites;

    private int currentSprite = 0, Health = 4;
    private SpriteRenderer spriteRenderer;

    private void Awake()
    {
        // Vergeet niet de spriteRenderer op te slaan !
        spriteRenderer = GetComponent<SpriteRenderer>();
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        // Als de shields geraakt worden gaat er 1 health van af en veranderd de sprite
        Health--;
        currentSprite++;
        if (Health == 0)
        {
            Destroy(gameObject);
            return;
        }
        spriteRenderer.sprite = sprites[currentSprite];
    }
}
