﻿
using System.Windows;
using AdaptiveCards.Rendering;

namespace AdaptiveCards.Rendering
{
    public partial class XamlRenderer
    {
        /// <summary>
        /// Get fallback text from the speech element 
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        protected static string GetFallbackText(CardElement cardElement)
        {
#if WPF
            if (!string.IsNullOrEmpty(cardElement.Speak))
            {
                var doc = new System.Xml.XmlDocument();
                var xml = cardElement.Speak;
                if (!xml.Trim().StartsWith("<"))
                    xml = $"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<Speak>{xml}</Speak>";
                else if (!xml.StartsWith("<?xml "))
                    xml = $"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n{xml}";
                doc.LoadXml(xml);
                return doc.InnerText;
            }
#elif XAMARIN 
            // TODO: Xamarin fallback
#endif

            return null;
        }

    }
}