using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UIElements;

public class ScoreDisplay : MonoBehaviour
{
    private GameManager game;
    private TextMeshProUGUI textField;

    private void Awake()
    {
        game = FindObjectOfType<GameManager>();
        textField = GetComponent<TextMeshProUGUI>();
    }
    
    public void PlayerScoreDisplayUpdate()
    {
        textField.text = game.GetPlayerScore().ToString();
    }

    public void OpponentScoreDisplayUpdate()
    {
        textField.text = game.GetOpponentScore().ToString();
    }
}
