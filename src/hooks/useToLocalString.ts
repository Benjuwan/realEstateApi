export const useToLocalString = () => {
    const ToLocalString = (targetWords: string) => parseInt(targetWords).toLocaleString();

    return { ToLocalString }
}