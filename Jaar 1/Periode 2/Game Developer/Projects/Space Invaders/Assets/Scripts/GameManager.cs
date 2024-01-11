using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.Events;

public class GameManager : MonoBehaviour
{
    // Maak de variabelen aan die je in Unity kan aanpassen voor hoeveel enemies je wilt hebben
    [SerializeField] private List<GameObject> enemyTypeOnRow;
    [SerializeField] private int amountPerRow;
    [SerializeField] private Rect enemyZone;
    [SerializeField] private float interval = 1f, moveAmount = 1f;
    [SerializeField] private GameObject winScreen, lostScreen;
    [SerializeField] private UnityEvent onScoreUpdate;
    // Maak een lijst aan voor de enemies
    private List<Enemy> enemies;
    private float timer;
    private int waveDirection, score;
    // Start is called before the first frame update
    void Start()
    {
        Create();
        winScreen.SetActive(false);
        lostScreen.SetActive(false);
    }

    void Create()
    {
        // Maak eerst een nieuwe lijst aan die we gaan gebruiken
        enemies = new List<Enemy>();
        // Twee lokale variabelen voor de leesbaarheid
        float startX = enemyZone.x;
        float startY = enemyZone.y + enemyZone.height;
        // Nested for loop die de enemies spawnen
        for (int i = 0; i < enemyTypeOnRow.Count; i++)
        {
            for (int j = 0; j < amountPerRow;  j++)
            {
                GameObject enemy = Instantiate(enemyTypeOnRow[i], new Vector3(startX + j, startY - i, 0), Quaternion.identity);
                enemies.Add(enemy.GetComponent<Enemy>());
            }
        }
    }

    private void OnDrawGizmos()
    {
        // Zorgt ervoor dat er een vierkant word gemaakt waar dingen in gemaakt kunnen worden
        Gizmos.DrawWireCube(enemyZone.center, enemyZone.size);
    }

    public void MoveEnemies(float x,  float y, float z) 
    {
        // Beweeg de enemies met x, y, z
        foreach(Enemy enemy in enemies)
        {
            enemy.transform.Translate(x, y, z);
        }
    }

    private void ApplyWaveDirection()
    {
        if (waveDirection == 0)
        {
            // Beweeg naar rechts
            MoveEnemies(moveAmount, 0, 0);
        }
        else if (waveDirection == 1)
        {
            // Beweeg naar beneden
            MoveEnemies(0, -moveAmount, 0);
        } 
        else if (waveDirection == 2)
        {
            // Beweeg naar links
            MoveEnemies(-moveAmount, 0, 0);
        }
        else if (waveDirection == 3)
        {
            //Beweeg naar beneden
            MoveEnemies(0, -moveAmount, 0);
        }
    }

    private bool EnemyIsTouchingRightSide()
    {
        // foreach enemy in de lijstZZ
        foreach(Enemy enemy in enemies)
        {
            // Als een enemy rechts het scherm afgaat return true
            if (enemy.transform.position.x >= enemyZone.x + enemyZone.width)
            {
                return true;
            }
        }
        return false;
    }

    private bool EnemyIsTouchingLeftSide()
    {
        // foreach enemy in de lijst
        foreach(Enemy enemy in enemies)
        {
            // Als een enemy links het scherm afgaat return true
            if (enemy.transform.position.x <= enemyZone.x)
            {
                return true;
            }
        }
        return false;
    }

    private void UpdateWaveDirection()
    {
        // Als de enemies naar rechts bewegen en het scherm afgaan stuur ze naar beneden
        if (waveDirection == 0)
        {
            if (EnemyIsTouchingRightSide() == true)
            {
                waveDirection = 1;
            }
        }
        // Als de enemies naar beneden gaan stuur ze door naar links na 1 keer
        else if (waveDirection == 1)
        {
            waveDirection = 2;
        }
        // Als de enemies naar links bewegen en het scherm afgaan stuur ze naar beneden
        else if (waveDirection == 2)
        {
            if (EnemyIsTouchingLeftSide() == true)
            {
                waveDirection = 3;
            }
        }
        // Als de enemies naar beneden gaan stuur ze door naar rechts na 1 keer
        else if (waveDirection == 3)
        {
            waveDirection = 0;
        }
    }

    public void AddScore(int amount)
    {
        // Telt de score op met hoeveel punten je krijgt van de enemy en update het scorebord
        score += amount;
        onScoreUpdate.Invoke();
    }

    public int GetScore()
    {
        return score;
    }

    public void RemoveEnemy(Enemy enemy)
    {
        // When an enemy dies it gets removed from the list
        enemies.Remove(enemy);
        Destroy(enemy.gameObject);
        if (enemies.Count == 0 )
        {
            winScreen.SetActive(true);
        }
    }

    public void ReportPlayerDeath()
    {
        // When the player dies the lost screen shows up
        lostScreen.SetActive(true);
    }

    public void ResetGame()
    {
        // When you click the "Reset game" button the game resets (Duh)
        Scene currentScene = SceneManager.GetActiveScene();
        SceneManager.LoadScene(currentScene.name);
    }

    void Update()
    {
        // Telt de timer op en zorgt ervoor als de timer hetzelfde of groter dan de interval is
        // Dat dan de wave verder beweegt
        timer += Time.deltaTime;
        if (timer >= interval)
        {
            UpdateWaveDirection();
            ApplyWaveDirection();
            timer = 0;
        }
    }
}
