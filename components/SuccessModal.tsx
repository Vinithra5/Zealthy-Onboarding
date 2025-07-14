interface SuccessModalProps {
  isVisible: boolean
  onClose?: () => void
}

export const SuccessModal = ({ isVisible }: SuccessModalProps) => {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl p-12 mx-4 max-w-md w-full text-center animate-in zoom-in-95 duration-300">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-[#25BA7E]"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Onboarding Complete!</h2>
        <p className="text-gray-500 text-lg mb-8">You'll be redirected to the homepage shortly…</p>
        <div className="flex justify-center">
          <div className="w-6 h-6 border-2 border-[#25BA7E] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  )
}
