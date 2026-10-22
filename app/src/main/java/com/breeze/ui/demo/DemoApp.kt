package com.breeze.ui.demo

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.breeze.ui.components.BzCell
import com.breeze.ui.components.BzPage
import com.breeze.ui.components.BzTitleBar
import com.breeze.ui.demo.screens.DemoCategoryScreen
import com.breeze.ui.demo.screens.HomeScreen
import com.breeze.ui.theme.BreezeThemeController
import com.breeze.ui.theme.BreezeThemeVariant

@Composable
fun DemoApp() {
    val nav = rememberNavController()
    NavHost(navController = nav, startDestination = "home") {
        composable("home") {
            HomeScreen(
                onOpenCategory = { id -> nav.navigate("category/$id") },
                onThemeChange = { BreezeThemeController.currentVariant = it },
            )
        }
        composable(
            route = "category/{id}",
            arguments = listOf(navArgument("id") { type = NavType.StringType }),
        ) { entry ->
            val id = entry.arguments?.getString("id") ?: return@composable
            DemoCategoryScreen(
                categoryId = id,
                onBack = { nav.popBackStack() },
            )
        }
    }
}
