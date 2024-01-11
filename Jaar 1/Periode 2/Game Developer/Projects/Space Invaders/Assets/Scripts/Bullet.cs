using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    // Maak variabelen aan die je in Unity kan aanpassen voor de snelheid en 
    [SerializeField] private float speed = 10f;
    [SerializeField] private GameObject hitEffect;
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        // Zorgt ervoor dat de bullet beweegt gebasseerd op de snelheid
        transform.Translate(0, speed * Time.deltaTime, 0);
        // Zorgt ervoor dat de bullet verdwijnt wanneer die van het scherm af gaat
        if (gameObject.transform.position.y > 5 || gameObject.transform.position.y < -5)
        {
            Destroy(gameObject);
        }
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        // Zorgt ervoor dat de explosie animatie afspeelt en de bullet verdwijnt wanner het iets raakt
        Instantiate(hitEffect, transform.position, transform.rotation);
        Destroy(gameObject);
    }
}
