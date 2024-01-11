using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public enum MovingDirection
{
    right,
    left,
    up_right,
    up_left,
    down_right,
    down_left,
}

public class Ball : MonoBehaviour
{
    [SerializeField] private GameManager game;
    [SerializeField] private float movementSpeed = 4f;
    [SerializeField] private MovingDirection status;
    [SerializeField] private GameObject ballPrefab;

    private float resetTimer;
    private bool resetGame;
    void Start()
    {
        // Aan het begin van de game word er randomly besloten of de ball naar links of rechts gaat
        float rnd = Random.Range(0, 2);
        if (rnd == 0)
        {
            status = MovingDirection.left;
        }
        else if (rnd == 1)
        {
            status = MovingDirection.right;
        }
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        // Gebasseerd op de status en wat de ball raakt kaatst de ball af
        if (collision.gameObject.name == "Top")
        {
            if (status == MovingDirection.up_right)
            {
                status = MovingDirection.down_right;
            }
            else if (status == MovingDirection.up_left)
            {
                status = MovingDirection.down_left;
            }
        }
        else if (collision.gameObject.name == "Bottom")
        {
            if (status == MovingDirection.down_right)
            {
                status = MovingDirection.up_right;
            }
            else if (status == MovingDirection.down_left)
            {
                status = MovingDirection.up_left;
            }
        }
        else if (collision.gameObject.name == "Left" || collision.gameObject.name == "Right")
        {
            // Als de bal de linker of rechter border raken betekent dat er gescoord is
            // Dan gaat de ball terug naar het midden en staat de ball even vast voordat het verder gaat
            // Tegelijk word ook de score toegevoegd gebasseerd op wie heeft gescoord
            resetGame = true;
            transform.position = new Vector3(0, 0, 0);
            float rnd = Random.Range(0, 2);
            if (rnd == 0)
            {
                status = MovingDirection.left;
            }
            else if (rnd == 1)
            {
                status = MovingDirection.right;
            }
            if (collision.gameObject.name == "Left")
            {
                game.AddOpponentScore();
            }
            else if (collision.gameObject.name == "Right")
            {
                game.AddPlayerScore();
            }
        }
        else if (collision.gameObject.name == "Player" || collision.gameObject.name == "Opponent")
        {
            float rnd = Random.Range(0, 2);
            if (status == MovingDirection.right)
            {
                if (rnd == 0)
                {
                    status = MovingDirection.up_left;
                }
                else if (rnd == 1)
                {
                    status = MovingDirection.down_left;
                }
            }
            else if (status == MovingDirection.left)
            {
                if (rnd == 0)
                {
                    status = MovingDirection.up_right;
                }
                else if (rnd == 1)
                {
                    status = MovingDirection.down_right;
                }
            }
            else if (status == MovingDirection.up_right)
            {
                status = MovingDirection.up_left;
            }
            else if (status == MovingDirection.up_left)
            {
                status = MovingDirection.up_right;
            }
            else if (status == MovingDirection.down_right)
            {
                status = MovingDirection.down_left;
            }
            else if (status == MovingDirection.down_left)
            {
                status = MovingDirection.down_right;
            }
        }
    }

    void Update()
    {
        if (resetGame == true)
        {
            // Als er gescoord is word de ball gereset en na een seconde gaat de ball verder
            resetTimer += Time.deltaTime;
            if (resetTimer >= 1)
            {
                resetGame = false;
                resetTimer = 0;
            }
        }
        else if (resetGame == false)
        {
            // Gebasseerd op de status meegegeven gaat de ball die kant op
            if (status == MovingDirection.right)
            {
                transform.Translate(Time.deltaTime * movementSpeed, 0, 0);
            }
            else if (status == MovingDirection.left)
            {
                transform.Translate(Time.deltaTime * -movementSpeed, 0, 0);
            }
            else if (status == MovingDirection.up_right)
            {
                transform.Translate(Time.deltaTime * movementSpeed, Time.deltaTime * movementSpeed, 0);
            }
            else if (status == MovingDirection.up_left)
            {
                transform.Translate(Time.deltaTime * -movementSpeed, Time.deltaTime * movementSpeed, 0);
            }
            else if (status == MovingDirection.down_right)
            {
                transform.Translate(Time.deltaTime * movementSpeed, Time.deltaTime * -movementSpeed, 0);
            }
            else if (status == MovingDirection.down_left)
            {
                transform.Translate(Time.deltaTime * -movementSpeed, Time.deltaTime * -movementSpeed, 0);
            }
        }
    }
}
