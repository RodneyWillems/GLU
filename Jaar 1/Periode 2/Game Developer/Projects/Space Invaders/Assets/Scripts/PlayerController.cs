using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Runtime.CompilerServices;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    // Maak variabelen aan die je kunt aanpassen in Unity voor movementSpeed en wat de bullet is
    [SerializeField] private float movementSpeed = 7f;
    [SerializeField] private GameObject bulletPrefab;
    
    private GameManager game;
    private int Health = 3;

    private void Awake()
    {
        game = FindObjectOfType<GameManager>();
    }

    void Update()
    {
        // Variabele die links/rechts input opslaat 
        float direction = Input.GetAxisRaw("Horizontal");
        // Zorgt ervoor dat de speler links/rechts beweegt gebasseerd op input
        transform.Translate(direction * movementSpeed * Time.deltaTime, 0, 0);
        // Zorgt ervoor dat als je op spatie drukt je schiet
        if (Input.GetKeyDown(KeyCode.Space))
        {
            Shoot();
        }
    }

    void Shoot()
    {
        // Maakt een bullet aan op dezelfde layer als de speler
        GameObject bullet = Instantiate(bulletPrefab, transform.position, transform.rotation);
        bullet.layer = gameObject.layer;
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        // Zorgt ervoor dat als de speler beschoten word je health verliest en doodgaat
        Health--;
        if (Health <= 0)
        {
            game.ReportPlayerDeath();
            Destroy(gameObject);
        }
    }
}
