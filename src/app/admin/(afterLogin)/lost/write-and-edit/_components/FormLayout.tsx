"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createLostItem, updateLostItem } from "@/api/lost-items";

interface FormLayoutProps {
  lostId?: number;
  itemName?: string;
  category?: string;
  description?: string;
  imageUrls?: string[];
  foundLocation?: string;
  foundTime?: string;
  storageLocation?: string;
  status?: string;
}

// 화면에 렌더링할 한글명과 서버로 전송할 영문명(Enum) 매핑
const CATEGORIES: { key: string; label: string }[] = [
  { key: "CLOTHING", label: "의류" },
  { key: "ACCESSORY", label: "액세서리" },
  { key: "ELECTRONICS", label: "전자기기" },
  { key: "BAG", label: "가방" },
  { key: "WALLET", label: "지갑" },
  { key: "DOCUMENT", label: "문서/신분증" },
  { key: "UMBRELLA", label: "우산" },
  { key: "BOTTLE", label: "텀블러/물병" },
  { key: "STATIONERY", label: "필기구" },
  { key: "KEY", label: "열쇠" },
  { key: "OTHER", label: "기타" },
];

function hasUnsafeImageFileName(fileName: string): boolean {
  return /[^\x00-\x7F]/.test(fileName) || /\s/.test(fileName);
}

const UNSAFE_IMAGE_FILE_NAME_MESSAGE =
  "파일명에 한글이나 공백이 포함되어 있습니다.\n영문·숫자·기호(-, _, .)만 사용하는 이름으로 변경한 뒤 다시 선택해주세요.";

export default function FormLayout({
  lostId,
  itemName,
  category,
  description,
  imageUrls,
  foundLocation,
  foundTime,
  storageLocation,
  status,
}: FormLayoutProps) {
  const router = useRouter();

  const initialImg = imageUrls && imageUrls.length > 0 ? imageUrls[0] : null;
  const [imgPreview, setImgPreview] = useState<string | null>(initialImg);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    category || "",
  );

  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (hasUnsafeImageFileName(file.name)) {
      alert(UNSAFE_IMAGE_FILE_NAME_MESSAGE);
      e.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImgPreview(previewUrl);
  };

  // 등록 및 수정 핸들러
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitDisabled) return;

    setSubmitDisabled(true);

    const formData = new FormData(e.currentTarget);
    const itemName = formData.get("itemName") as string;
    const description = formData.get("description") as string;
    const foundLocation = formData.get("foundLocation") as string;
    const foundTime = formData.get("foundTime") as string;
    const storageLocation = formData.get("storageLocation") as string;
    const image = formData.get("image") as File;

    if (
      !itemName.trim() ||
      !foundLocation.trim() ||
      !foundTime.trim() ||
      !storageLocation.trim() ||
      !description.trim()
    ) {
      alert("모든 텍스트 항목을 입력해주세요.");
      setSubmitDisabled(false);
      return;
    }

    if (!selectedCategory) {
      alert("카테고리를 선택해주세요.");
      setSubmitDisabled(false);
      return;
    }

    if (!imgPreview && (!image || image.size === 0)) {
      alert("사진을 첨부해주세요.");
      setSubmitDisabled(false);
      return;
    }

    if (image && image.size > 0 && hasUnsafeImageFileName(image.name)) {
      alert(UNSAFE_IMAGE_FILE_NAME_MESSAGE);
      setSubmitDisabled(false);
      return;
    }

    if (lostId) {
      try {
        const apiFormData = new FormData();
        const requestData = {
          itemName,
          category: selectedCategory,
          description,
          foundLocation,
          foundTime,
          storageLocation,
        };
        apiFormData.append(
          "data",
          new Blob([JSON.stringify(requestData)], { type: "application/json" }),
        );

        if (image && image.size > 0) {
          apiFormData.append("images", image);
        }

        await updateLostItem(lostId, apiFormData);
        alert("분실물이 성공적으로 수정되었습니다.");
        router.replace(`/admin/lost/`);
      } catch (error) {
        console.error("분실물 수정 예외 발생:", error);
        alert("분실물 수정에 실패했습니다.");
      } finally {
        setSubmitDisabled(false);
      }
    } else {
      try {
        const apiFormData = new FormData();
        const requestData = {
          itemName,
          category: selectedCategory,
          description,
          foundLocation,
          foundTime,
          storageLocation,
        };
        apiFormData.append(
          "data",
          new Blob([JSON.stringify(requestData)], { type: "application/json" }),
        );

        if (image && image.size > 0) {
          apiFormData.append("images", image);
        }

        await createLostItem(apiFormData);
        alert("분실물 등록이 완료되었습니다.");
        router.replace(`/admin/lost/`);
      } catch (error) {
        console.error("분실물 등록 예외 발생:", error);
        alert("분실물 등록에 실패했습니다.");
      } finally {
        setSubmitDisabled(false);
      }
    }
  };

  return (
    <form
      className="flex flex-col bg-white min-h-screen"
      onSubmit={submitHandler}
    >
      <div className="px-4 mt-6 mb-4">
        <input
          name="itemName"
          type="text"
          placeholder="분실물 이름을 입력해주세요"
          className="w-full bg-[#f4f4f4] p-3 text-base text-gray-800 focus:outline-none"
          defaultValue={itemName || ""}
        />
      </div>

      <div className="bg-[#f4f4f4] px-4 py-6 flex flex-col gap-6">
        {/* 사진 */}
        <div className="flex">
          <span className="w-24 text-[#a3a3a3] font-medium pt-1">사진</span>
          <div className="flex-1">
            <label
              htmlFor="image-upload"
              className="cursor-pointer text-gray-800 text-base"
            >
              {imgPreview ? (
                <div className="relative w-20 h-20 bg-gray-200">
                  <Image
                    src={imgPreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                "사진 첨부"
              )}
            </label>
            <input
              id="image-upload"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* 습득 장소 */}
        <div className="flex items-center">
          <span className="w-24 text-[#a3a3a3] font-medium">습득 장소</span>
          <input
            name="foundLocation"
            type="text"
            placeholder="장소를 입력해주세요"
            className="flex-1 bg-transparent text-gray-800 focus:outline-none placeholder:text-[#a3a3a3]"
            defaultValue={foundLocation || ""}
          />
        </div>

        {/* 습득 시간 */}
        <div className="flex items-center">
          <span className="w-24 text-[#a3a3a3] font-medium">습득 시간</span>
          <input
            name="foundTime"
            type="text"
            placeholder="시간(예: 2026-05-15 14:30경)"
            className="flex-1 bg-transparent text-gray-800 focus:outline-none placeholder:text-[#a3a3a3]"
            defaultValue={foundTime || ""}
          />
        </div>

        {/* 보관 장소 (추가됨) */}
        <div className="flex items-center">
          <span className="w-24 text-[#a3a3a3] font-medium">보관 장소</span>
          <input
            name="storageLocation"
            type="text"
            placeholder="보관 장소를 입력해주세요"
            className="flex-1 bg-transparent text-gray-800 focus:outline-none placeholder:text-[#a3a3a3]"
            defaultValue={storageLocation || ""}
          />
        </div>

        {/* 카테고리 */}
        <div className="flex">
          <span className="w-24 text-[#a3a3a3] font-medium pt-1">카테고리</span>
          <div className="flex-1 bg-[#d9d9d9] p-3 rounded relative">
            <div className="absolute top-3 right-3 text-black">▼</div>
            <div className="flex flex-col items-start gap-2 max-w-fit relative z-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                    selectedCategory === cat.key
                      ? "bg-custom-blue text-white border-2 border-gray-400"
                      : "bg-white text-gray-500"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <textarea
          name="description"
          placeholder="내용을 입력하세요"
          className="w-full h-32 resize-none bg-transparent text-gray-800 focus:outline-none placeholder:text-[#a3a3a3]"
          defaultValue={description || ""}
        />

        <div className="flex justify-end gap-3 mt-auto pb-10 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 bg-[#f1f1f1] text-[#1c1b1f] font-semibold rounded-lg"
            disabled={submitDisabled}
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-custom-blue text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submitDisabled}
          >
            {submitDisabled ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </form>
  );
}
