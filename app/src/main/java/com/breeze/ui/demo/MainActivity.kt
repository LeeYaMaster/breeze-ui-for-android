package com.breeze.ui.demo

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeThemeController

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            val variant = BreezeThemeController.currentVariant
            val darkTheme = BreezeThemeController.darkTheme ?: isSystemInDarkTheme()
            BreezeTheme(variant = variant, darkTheme = darkTheme) {
                DemoApp()
            }
        }
    }
}
