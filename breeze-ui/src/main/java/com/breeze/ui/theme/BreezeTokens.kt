package com.breeze.ui.theme

import androidx.compose.ui.graphics.Color

/**
 * 设计令牌，对应 mini-program `breeze-ui/styles/tokens.wxss`。
 */
object BreezeTokens {
    val Red = Color(0xFFE54D42)
    val Orange = Color(0xFFF37B1D)
    val Yellow = Color(0xFFFBBD08)
    val Olive = Color(0xFF8DC63F)
    val Green = Color(0xFF10B981)
    val Cyan = Color(0xFF1CBBB4)
    val Blue = Color(0xFF3B82F6)
    val Purple = Color(0xFF6739B6)
    val Mauve = Color(0xFF9C26B0)
    val Pink = Color(0xFFE03997)
    val Brown = Color(0xFFA5673F)
    val Grey = Color(0xFF8799A3)
    val Black = Color(0xFF333333)
    val DarkGray = Color(0xFF666666)
    val Gray = Color(0xFFAAAAAA)
    val GhostWhite = Color(0xFFF1F1F1)
    val White = Color(0xFFFFFFFF)

    val RedLight = Color(0xFFFADBD9)
    val OrangeLight = Color(0xFFFDE6D2)
    val YellowLight = Color(0xFFFEF2CE)
    val OliveLight = Color(0xFFE8F4D9)
    val GreenLight = Color(0xFFD1FAE5)
    val CyanLight = Color(0xFFD2F1F0)
    val BlueLight = Color(0xFFCCE6FF)
    val PurpleLight = Color(0xFFE1D7F0)
    val MauveLight = Color(0xFFEBD4EF)
    val PinkLight = Color(0xFFF9D7EA)
    val BrownLight = Color(0xFFEDE1D9)
    val GreyLight = Color(0xFFE7EBED)

    fun namedColor(name: String?): Color? = when (name?.lowercase()) {
        "red" -> Red
        "orange" -> Orange
        "yellow" -> Yellow
        "olive" -> Olive
        "green" -> Green
        "cyan" -> Cyan
        "blue" -> Blue
        "purple" -> Purple
        "mauve" -> Mauve
        "pink" -> Pink
        "brown" -> Brown
        "grey", "gray" -> Grey
        "black" -> Black
        "white" -> White
        "theme" -> null
        else -> null
    }

    fun namedLightColor(name: String?): Color? = when (name?.lowercase()) {
        "red" -> RedLight
        "orange" -> OrangeLight
        "yellow" -> YellowLight
        "olive" -> OliveLight
        "green" -> GreenLight
        "cyan" -> CyanLight
        "blue" -> BlueLight
        "purple" -> PurpleLight
        "mauve" -> MauveLight
        "pink" -> PinkLight
        "brown" -> BrownLight
        "grey", "gray" -> GreyLight
        else -> null
    }
}
