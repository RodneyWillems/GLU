using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    // Maakt variabelen aan die je kunt aanpassen in Unity voor de Health
    // De minimale en maximale attack time
    // De bullet opslaat en waar het spawnt en of ze kunnen schieten of niet
    [SerializeField] private int Health = 1, points;
    [SerializeField] private float minAttackTime = 1, maxAttackTime = 5;
    [SerializeField] private GameObject bulletPrefab;
    [SerializeField] private Transform bulletSpawnPoint;
    [SerializeField] private bool attacks = false;
    // Maakt variabelen aan voor de timer en interval
    private GameManager game;
    private float attackTimer, attackInterval;
    // Awake word gedaan voor Start()
    private void Awake()
    {
        game = FindObjectOfType<GameManager>();
    }

    // Start is called before the first frame update
    void Start()
    {
        // Kiest voor een random tijd tussen de minimale en maximale tijd om aan te vallen
        attackInterval = Random.Range(minAttackTime, maxAttackTime);
    }

    void Shoot()
    {
        // Spawnt een bullet en zet het op dezelfde layer als de enemy en kiest dan een nieuwe random tijd om te schieten
        GameObject bullet = Instantiate(bulletPrefab, bulletSpawnPoint.position, bulletSpawnPoint.rotation);
        bullet.layer = gameObject.layer;
        attackInterval = Random.Range(minAttackTime, maxAttackTime);
    }

    // Update is called once per frame
    void Update()
    {
        // Als de enemy niet mag aanvallen stopt het hier
        if (!attacks) return;
        // De timer telt op tot de interval en schiet dan
        attackTimer += Time.deltaTime;
        if (attackTimer >= attackInterval) {
            Shoot();
            attackTimer = 0;
        }
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        // Zorgt ervoor dat als de enemy geraakt word hun health omlaag gaat 
        // Als hun health 0 of lager is gaan ze dood
        Health--;
        if (Health <= 0 )
        {
            game.AddScore(points);
            game.RemoveEnemy(this);
        }
    }
}
