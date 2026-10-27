package com.breeze.ui.demo

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.breeze.ui.demo.screens.DemoCategoryScreen
import com.breeze.ui.demo.screens.HomeScreen
import com.breeze.ui.theme.BreezeThemeController
import com.breeze.ui.theme.BreezeThemeVariant
import com.breeze.ui.theme.bzPage
import com.breeze.ui.theme.rememberBzPageTransitionDuration

@Composable
fun DemoApp() {
    val nav = rememberNavController()
    val pageTransitionMs = rememberBzPageTransitionDuration()
    NavHost(navController = nav, startDestination = "home") {
        bzPage(route = "home", transitionDurationMs = pageTransitionMs) {
            HomeScreen(
                onOpenCategory = { id -> nav.navigate("category/$id") },
                onThemeChange = { BreezeThemeController.currentVariant = it },
            )
        }
        bzPage(
            route = "category/{id}",
            transitionDurationMs = pageTransitionMs,
            arguments = listOf(navArgument("id") { type = NavType.StringType }),
        ) { entry ->
            val id = entry.arguments?.getString("id") ?: return@bzPage
            DemoCategoryScreen(
                categoryId = id,
                onBack = { nav.popBackStack() },
            )
        }
    }
}
