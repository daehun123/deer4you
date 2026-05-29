"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { createEvent, updateEvent } from "@/api/events";

interface FormLayoutProps {
  // 편집용
  eventId?: string;
  title?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  description?: string;
  method?: string;
  prizeText?: string;
  prizeImageUrl?: string;
  mainImageUrl?: string;
  caution?: string;
}

export default function FormLayout({
  eventId,
  title,
  startDate,
  endDate,
  location,
  description,
  method,
  prizeText,
  prizeImageUrl,
  mainImageUrl,
  caution,
}: FormLayoutProps) {
  const [mainImgPreview, setMainImgPreview] = React.useState<string | null>(
    mainImageUrl || null,
  );
  const [prizeImgPreview, setPrizeImgPreview] = React.useState<string | null>(
    prizeImageUrl || null,
  );
  const [prizeCategory, setPrizeCategory] = React.useState<string>(
    prizeText ? "category1" : prizeImageUrl ? "category2" : "",
  );
  const router = useRouter();

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setMainImgPreview(previewUrl);
    }
  };
  const handlePrizeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPrizeImgPreview(previewUrl);
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title")?.toString().trim();
    const startTime = formData.get("startTime")?.toString().trim();
    const endTime = formData.get("endTime")?.toString().trim();
    const location = formData.get("location")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const method = formData.get("method")?.toString().trim();
    const prizeText = formData.get("prizeText")?.toString().trim();
    const cautionText = formData.get("caution")?.toString().trim();

    if (!title) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!mainImgPreview) {
      alert("이벤트 메인 이미지를 등록해주세요.");
      return;
    }
    if (!startTime || !endTime) {
      alert("시작 및 종료 일시를 모두 입력해주세요.");
      return;
    }
    if (!location) {
      alert("장소를 입력해주세요.");
      return;
    }
    if (!description) {
      alert("설명을 입력해주세요.");
      return;
    }
    if (!method) {
      alert("진행 방법을 입력해주세요.");
      return;
    }
    if (prizeCategory === "category1" && !prizeText) {
      alert("상품 설명(텍스트)을 입력해주세요.");
      return;
    }
    if (prizeCategory === "category2" && !prizeImgPreview) {
      alert("상품 이미지를 등록해주세요.");
      return;
    }

    try {
      const apiFormData = new FormData();

      const requestData = {
        title: title,
        description: description,
        content: method,
        contentType: prizeCategory === "category2" ? "IMAGE" : "TEXT",
        productDescription: prizeText || "",
        caution: cautionText || null,
        startTime: startTime.length === 16 ? `${startTime}:00` : startTime,
        endTime: endTime.length === 16 ? `${endTime}:00` : endTime,
        location: location,
      };

      apiFormData.append(
        "data",
        new Blob([JSON.stringify(requestData)], { type: "application/json" }),
      );

      const mainImageFile = formData.get("mainImage") as File;
      if (mainImageFile && mainImageFile.size > 0) {
        apiFormData.append("images", mainImageFile);
      }

      const prizeImageFile =
        prizeCategory === "category2"
          ? (formData.get("prizeImage") as File)
          : null;
      if (prizeImageFile && prizeImageFile.size > 0) {
        apiFormData.append("contentImages", prizeImageFile);
      }

      if (eventId) {
        await updateEvent(eventId, apiFormData);
        
        alert("이벤트가 성공적으로 수정되었습니다.");
      } else {
        await createEvent(apiFormData);
        alert("이벤트가 성공적으로 생성되었습니다.");
      }

      router.push("/admin/event");
      router.refresh();
    } catch (error) {
      console.error("이벤트 전송 에러 캐치:", error);
      alert("이벤트 저장 중 오류가 발생했습니다. 콘솔을 확인하세요.");
    }
  };

  return (
    <form className="flex gap-4 flex-col" onSubmit={submitHandler}>
      <input
        name="title"
        type="text"
        placeholder="제목을 입력하세요"
        className="bg-custom-lightgray p-2 rounded-lg"
        defaultValue={title || ""}
      />
      <section>
        <label
          htmlFor="image-upload"
          className="flex items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          {mainImgPreview ? (
            <Image
              src={mainImgPreview}
              alt="Preview"
              width={200}
              height={200}
              priority
              className="object-contain w-full h-full p-2 z-50"
            />
          ) : (
            <span className="text-gray-500 z-10">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_169_16534"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_169_16534)">
                  <path
                    d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM19 7.25L12.95 14.05L9 10.1L5 14.1V16.95L9 12.95L13.05 17L19 10.25V7.25Z"
                    fill="#1C1B1F"
                  />
                </g>
              </svg>
            </span>
          )}
        </label>

        <input
          id="image-upload"
          name="mainImage"
          type="file"
          accept="image/*"
          onChange={handleMainImageChange}
          className="hidden"
        />
      </section>
      <div className="flex gap-4 flex-col  bg-custom-lightgray p-4 rounded-lg">
        <section className="flex flex-row gap-4 items-center">
          <p className="whitespace-nowrap">시작 일시</p>
          <input
            name="startTime"
            type="datetime-local"
            className="p-1 rounded-md border border-gray-300 w-full"
            defaultValue={startDate || ""}
          />
        </section>
        <section className="flex flex-row gap-4 items-center">
          <p className="whitespace-nowrap">종료 일시</p>
          <input
            name="endTime"
            type="datetime-local"
            className="p-1 rounded-md border border-gray-300 w-full"
            defaultValue={endDate || ""}
          />
        </section>
        <section className="flex flex-row gap-4 items-center">
          <p className="whitespace-nowrap">장소</p>
          <input
            name="location"
            type="text"
            placeholder="장소를 입력하세요"
            defaultValue={location || ""}
          />
        </section>
        <section className="flex flex-row gap-4">
          <p>설명</p>
          <textarea
            name="description"
            placeholder="설명을 입력하세요"
            defaultValue={description || ""}
          />
        </section>
      </div>

      <textarea
        name="method"
        placeholder="진행 방법을 입력하세요"
        className="w-full p-2 border border-gray-300 rounded-md min-h-60 bg-custom-lightgray"
        defaultValue={method || ""}
      />
      <div>
        <select
          className="p-2 rounded-md bg-custom-lightgray"
          value={prizeCategory}
          onChange={(e) => setPrizeCategory(e.target.value)}
        >
          <option value="">상품 입력 카테고리 선택</option>
          <option value="category1">텍스트</option>
          <option value="category2">이미지</option>
        </select>
        {prizeCategory === "category1" && (
          <textarea
            name="prizeText"
            placeholder="상품을 입력하세요"
            className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-custom-lightgray min-h-40"
            defaultValue={prizeText || ""}
          />
        )}
        {prizeCategory === "category2" && (
          <section className="mt-2">
            <label
              htmlFor="prize-image-upload"
              className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              {prizeImgPreview ? (
                <Image
                  src={prizeImgPreview}
                  alt="Prize Preview"
                  width={200}
                  height={200}
                  className="object-contain w-full h-full p-2"
                />
              ) : (
                <span className="text-gray-500 text-sm">
                  여기를 클릭하여 상품 이미지 삽입
                </span>
              )}
            </label>

            <input
              id="prize-image-upload"
              name="prizeImage"
              type="file"
              accept="image/*"
              onChange={handlePrizeImageChange}
              className="hidden"
            />
          </section>
        )}
      </div>
      <textarea
        name="caution"
        placeholder="이벤트 유의사항을 입력하세요 (줄바꿈으로 항목 구분)"
        className="w-full p-2 border border-gray-300 rounded-md min-h-32 bg-custom-lightgray"
        defaultValue={caution || ""}
      />
      <div className=" justify-end flex gap-4">
        <button
          type="button"
          className="font-semibold bg-custom-lightgray rounded-md px-2.5 py-1.5"
          onClick={() => router.back()}
        >
          취소
        </button>
        <button
          type="submit"
          className="font-semibold bg-blue-500 text-white rounded-md px-2.5 py-1.5"
        >
          저장
        </button>
      </div>
    </form>
  );
}
