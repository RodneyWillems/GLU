using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
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

    public void UpdateScoreDisplay()
    {
        textField.text = game.GetScore().ToString();
    }
}
