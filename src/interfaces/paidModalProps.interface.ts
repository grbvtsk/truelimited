export interface PaidModalProps {
    isVisible: boolean;
    setPopupVisible: (isVisible: boolean) => void;
    onClose: () => void;
    setIsPaid: (isPaid: boolean) => void;
}
