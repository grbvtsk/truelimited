import axios from "axios";

const PaidModal = ({ isVisible,setPopupVisible, onClose,setIsPaid }) => {
    if (!isVisible) return null;

    const handlePayment = async()=> {
        await axios.post("/api/users/status", { isPaid: true })
        await axios.get("/api/users/status")
        setIsPaid(true)
        alert("Payment Successful!")
        setPopupVisible(false)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md text-center">
                <h2 className="text-lg font-bold mb-4 text-black">Payment Confirmation</h2>
                <p className="mb-4 text-black">Pay money, fast!</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        onClick={handlePayment}
                    >
                        Pay
                    </button>
                    <button
                        className="bg-gray-300 text-black px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
export default PaidModal
