package com.breeze.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.outlined.StarBorder
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.RadioButton
import androidx.compose.material3.RadioButtonDefaults
import androidx.compose.material3.Slider
import androidx.compose.material3.SliderDefaults
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.draw.scale
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.breeze.ui.theme.BreezeMotion
import com.breeze.ui.theme.BreezeTheme
import com.breeze.ui.theme.BreezeTokens
import com.breeze.ui.theme.bzClickable

/**
 * 单行输入（`bz-input`）。
 */
@Composable
fun BzInput(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    placeholder: String = "",
    enabled: Boolean = true,
) {
    BasicTextField(
        value = value,
        onValueChange = onValueChange,
        enabled = enabled,
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(BreezeTheme.radius.md))
            .background(BreezeTheme.colors.surface)
            .border(1.dp, BreezeTheme.colors.divider, RoundedCornerShape(BreezeTheme.radius.md))
            .padding(horizontal = 12.dp, vertical = 12.dp),
        textStyle = androidx.compose.ui.text.TextStyle(fontSize = 14.sp, color = BreezeTheme.colors.textPrimary),
        cursorBrush = SolidColor(BreezeTheme.colors.primary),
        decorationBox = { inner ->
            Box {
                if (value.isEmpty()) {
                    Text(placeholder, color = BreezeTokens.Grey, fontSize = 14.sp)
                }
                inner()
            }
        },
    )
}

/**
 * 多行输入（`bz-textarea`）。
 */
@Composable
fun BzTextarea(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    placeholder: String = "",
    minLines: Int = 3,
) {
    BasicTextField(
        value = value,
        onValueChange = onValueChange,
        modifier = modifier
            .fillMaxWidth()
            .height(96.dp)
            .clip(RoundedCornerShape(BreezeTheme.radius.md))
            .background(BreezeTheme.colors.surface)
            .border(1.dp, BreezeTheme.colors.divider, RoundedCornerShape(BreezeTheme.radius.md))
            .padding(12.dp),
        textStyle = androidx.compose.ui.text.TextStyle(fontSize = 14.sp),
        cursorBrush = SolidColor(BreezeTheme.colors.primary),
        decorationBox = { inner ->
            Box {
                if (value.isEmpty()) Text(placeholder, color = BreezeTokens.Grey)
                inner()
            }
        },
    )
}

/** 开关（`bz-switch`）。 */
@Composable
fun BzSwitch(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
) {
    Switch(
        checked = checked,
        onCheckedChange = onCheckedChange,
        enabled = enabled,
        modifier = modifier,
        colors = SwitchDefaults.colors(
            checkedThumbColor = BreezeTokens.White,
            checkedTrackColor = BreezeTheme.colors.primary,
            uncheckedThumbColor = BreezeTokens.White,
            uncheckedTrackColor = BreezeTokens.GreyLight,
        ),
    )
}

/** 复选框（`bz-checkbox`）。 */
@Composable
fun BzCheckbox(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    label: String? = null,
) {
    val scale by animateFloatAsState(
        targetValue = if (checked && BreezeMotion.isEnabled()) 1.08f else 1f,
        animationSpec = BreezeMotion.springPress(dampingRatio = Spring.DampingRatioLowBouncy),
        label = "chkScale",
    )
    Row(modifier.bzClickable { onCheckedChange(!checked) }, verticalAlignment = Alignment.CenterVertically) {
        Checkbox(
            modifier = Modifier.scale(scale),
            checked = checked,
            onCheckedChange = onCheckedChange,
            colors = CheckboxDefaults.colors(checkedColor = BreezeTheme.colors.primary),
        )
        label?.let { Text(it, modifier = Modifier.padding(start = 4.dp)) }
    }
}

data class BzRadioOption(val value: String, val label: String)

/** 单选组（`bz-radio-group`）。 */
@Composable
fun BzRadioGroup(
    options: List<BzRadioOption>,
    selected: String,
    onSelected: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    Column(modifier) {
        options.forEach { opt ->
            Row(
                Modifier
                    .fillMaxWidth()
                    .bzClickable { onSelected(opt.value) }
                    .padding(vertical = 6.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                RadioButton(
                    selected = selected == opt.value,
                    onClick = { onSelected(opt.value) },
                    colors = RadioButtonDefaults.colors(selectedColor = BreezeTheme.colors.primary),
                )
                Text(opt.label, modifier = Modifier.padding(start = 8.dp))
            }
        }
    }
}

/** 评分（`bz-rate`）。 */
@Composable
fun BzRate(
    value: Int,
    onValueChange: (Int) -> Unit,
    modifier: Modifier = Modifier,
    count: Int = 5,
) {
    Row(modifier, horizontalArrangement = Arrangement.spacedBy(4.dp)) {
        for (i in 1..count) {
            val filled = i <= value
            BzIcon(
                imageVector = if (filled) Icons.Filled.Star else Icons.Outlined.StarBorder,
                tint = if (filled) BreezeTokens.Yellow else BreezeTokens.GreyLight,
                modifier = Modifier.bzClickable { onValueChange(i) },
            )
        }
    }
}

/** 滑块（`bz-slider`）。 */
@Composable
fun BzSlider(
    value: Float,
    onValueChange: (Float) -> Unit,
    modifier: Modifier = Modifier,
    valueRange: ClosedFloatingPointRange<Float> = 0f..100f,
) {
    Slider(
        value = value,
        onValueChange = onValueChange,
        valueRange = valueRange,
        modifier = modifier,
        colors = SliderDefaults.colors(
            thumbColor = BreezeTheme.colors.primary,
            activeTrackColor = BreezeTheme.colors.primary,
            inactiveTrackColor = BreezeTheme.colors.light,
        ),
    )
}
