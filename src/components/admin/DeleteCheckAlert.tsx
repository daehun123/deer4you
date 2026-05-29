import React from "react";

interface DeleteCheckAlertProps {
  setVisible: (visible: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteCheckAlert({
  setVisible,
  onConfirm,
  onCancel,
}: DeleteCheckAlertProps) {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center cursor-pointer"
        onClick={() => {
          setVisible(false);
          onCancel();
        }}
      ></div>

      <div className="bg-white p-6 rounded-lg shadow-lg z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80">
        <h2 className="text-xl font-bold mb-4">삭제 확인</h2>
        <p className="mb-6">정말로 삭제하시겠습니까?</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => {
              setVisible(false);
              onCancel();
            }}
          >
            취소
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => {
              setVisible(false);
              onConfirm();
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </>
  );
}
