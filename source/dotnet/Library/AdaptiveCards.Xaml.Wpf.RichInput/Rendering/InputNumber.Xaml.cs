﻿using System;
using System.Windows;
using Xceed.Wpf.Toolkit;

namespace AdaptiveCards.Rendering
{
    public partial class XamlRendererExtended : XamlRenderer
    {

        /// <summary>
        /// Input.Number
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        protected static FrameworkElement RenderInputNumberEx(TypedElement element, RenderContext context)
        {
            InputNumber input = (InputNumber)element;
            if (context.Options.AdaptiveCard.SupportsInteractivity)
            {

                IntegerUpDown numberPicker = new IntegerUpDown();
                // numberPicker.ShowButtonSpinner = true;

                if (!Double.IsNaN(input.Value))
                    numberPicker.Value = Convert.ToInt32(input.Value);

                if (!Double.IsNaN(input.Min))
                    numberPicker.Minimum = Convert.ToInt32(input.Min);

                if (!Double.IsNaN(input.Max))
                    numberPicker.Minimum = Convert.ToInt32(input.Max);

                numberPicker.Watermark = input.Placeholder;
                numberPicker.Style = context.GetStyle("Adaptive.Input.Number");
                numberPicker.DataContext = input;
                context.InputControls.Add(numberPicker);
                return numberPicker;
            }
            else
            {
                var textBlock = new TextBlock() { Text = GetFallbackText(input) ?? input.Placeholder };
                return context.Render(textBlock);
            }

        }
    }
}