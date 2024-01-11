using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

public class GameManager : MonoBehaviour
{
    [SerializeField] private UnityEvent playerScoreUpdate;
    [SerializeField] private UnityEvent opponentScoreUpdate;

    private int playerScore, opponentScore;

    // Functies om de scores op de goede plek toe te voegen
    public void AddPlayerScore()
    {
        playerScore++;
        playerScoreUpdate.Invoke();
    }

    public void AddOpponentScore()
    {
        opponentScore++;
        opponentScoreUpdate.Invoke();
    }

    public int GetPlayerScore()
    {
        return playerScore;
    }

    public int GetOpponentScore()
    {
        return opponentScore;
    }
}
