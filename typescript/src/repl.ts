export function cleanInput(input: string): string[] {
    const words = input.trim().toLowerCase().split(/\s+/)
    return words
}