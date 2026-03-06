



export default function getThemeColors(proprty_name: string) {
    const rootStyles = getComputedStyle(document.documentElement)
    return rootStyles.getPropertyValue(proprty_name)
}