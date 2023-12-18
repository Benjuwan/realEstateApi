export const useToLocalString = () => {
    const ToLocalString: (targetWords: string) => string = (targetWords: string) => parseInt(targetWords).toLocaleString();

    return { ToLocalString }
}