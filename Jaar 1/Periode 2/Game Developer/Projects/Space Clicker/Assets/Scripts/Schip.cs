using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Schip : MonoBehaviour
{
    [SerializeField] private float speedX;
    [SerializeField] private float resetXPosition;
    private float shipWidth;
    private GameManager game;
    [SerializeField] int scoreAmount;
    // Start is called before the first frame update
    void Start()
    {
        shipWidth = GetComponent<SpriteRenderer>().bounds.size.x;
        game = FindObjectOfType<GameManager>();
    }

    // Update is called once per frame
    void Update()
    {
     transform.position = transform.position + new Vector3(speedX * Time.deltaTime, 0f, 0f);  
     if (transform.position.x + (shipWidth / 2) < 0)
        {
            transform.position = new Vector3(resetXPosition, transform.position.y, transform.position.z);
            game.AddScore(-50);
        }
    }

    private void OnMouseDown()
    {
        transform.position = new Vector3(resetXPosition, transform.position.y, transform.position.z);
        game.AddScore(scoreAmount);
    }
}
