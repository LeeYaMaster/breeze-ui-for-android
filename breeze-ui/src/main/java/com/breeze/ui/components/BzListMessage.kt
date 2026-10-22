package com.breeze.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeTokens

data class BzChatMessage(
    val id: String,
    val text: String,
    val isSelf: Boolean,
    val time: String? = null,
)

/** 聊天消息行（`bz-list-message` 简化）。 */
@Composable
fun BzListMessage(
    messages: List<BzChatMessage>,
    modifier: Modifier = Modifier,
) {
    Column(modifier.padding(16.dp), verticalArrangement = androidx.compose.foundation.layout.Arrangement.spacedBy(12.dp)) {
        messages.forEach { msg ->
            Column(
                Modifier.fillMaxWidth(),
                horizontalAlignment = if (msg.isSelf) Alignment.End else Alignment.Start,
            ) {
                BoxBubble(text = msg.text, isSelf = msg.isSelf)
                msg.time?.let {
                    Text(it, fontSize = 10.sp, color = BreezeTokens.Grey, modifier = Modifier.padding(top = 4.dp))
                }
            }
        }
    }
}

@Composable
private fun BoxBubble(text: String, isSelf: Boolean) {
    val bg = if (isSelf) BreezeTheme.colors.primary else BreezeTokens.White
    val fg = if (isSelf) BreezeTokens.White else BreezeTheme.colors.textPrimary
    Text(
        text,
        modifier = Modifier
            .clip(
                RoundedCornerShape(
                    topStart = 12.dp,
                    topEnd = 12.dp,
                    bottomStart = if (isSelf) 12.dp else 4.dp,
                    bottomEnd = if (isSelf) 4.dp else 12.dp,
                ),
            )
            .background(bg)
            .padding(horizontal = 12.dp, vertical = 8.dp),
        color = fg,
        fontSize = 14.sp,
    )
}
