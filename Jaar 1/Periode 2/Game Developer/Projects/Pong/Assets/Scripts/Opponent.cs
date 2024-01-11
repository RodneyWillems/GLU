using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Opponent : MonoBehaviour
{
    [SerializeField] private float movementSpeed = 4f;

    void Update()
    {
        // Checken of je pijltjes gebruikt ipv rawInput(Horizontal) zorgt ervoor dat speler 1
        // W en S kan gebruiken
        if (Input.GetKey(KeyCode.UpArrow))
        {
            if (gameObject.transform.position.y < 3.7)
            {
                transform.Translate(0, Time.deltaTime * movementSpeed, 0);
            }
        }
        else if (Input.GetKey(KeyCode.DownArrow))
        {
            if (gameObject.transform.position.y > -3.7)
            {
                transform.Translate(0, Time.deltaTime * -movementSpeed, 0);
            }
        }
    }
}
