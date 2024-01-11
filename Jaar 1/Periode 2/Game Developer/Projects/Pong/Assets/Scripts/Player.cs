using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    [SerializeField] private float movementSpeed = 4f;
    
    void Update()
    {
        // Checken of je W of S gebruikt ipv rawInput(Horizontal) zorgt ervoor dat speler 2/opponent
        // De pijltjes toetsen kan gebruiken
        if (Input.GetKey(KeyCode.W))
        {
            if (gameObject.transform.position.y < 3.7)
            {
                transform.Translate(0, Time.deltaTime * movementSpeed, 0);
            }
        }
        else if (Input.GetKey(KeyCode.S))
        {
            if (gameObject.transform.position.y > -3.7)
            {
                transform.Translate(0, Time.deltaTime * -movementSpeed, 0);
            }
        }
    }
}
