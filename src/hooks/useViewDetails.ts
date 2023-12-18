/* 詳細情報の表示機能（モーダル）*/

export const useViewDetails = () => {
    const ViewDetails: (targetViewElm: HTMLElement) => void = (targetViewElm: HTMLElement) => {
        const detailsContent = targetViewElm.parentElement?.querySelector('.details');
        if (detailsContent?.classList.contains('OnView')) {
            detailsContent.classList.remove('OnView');
        } else {
            detailsContent?.classList.add('OnView');
        }
    }

    return { ViewDetails }
}