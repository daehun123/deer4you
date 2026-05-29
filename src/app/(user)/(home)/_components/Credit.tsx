import React from "react";

const creditData = [
  {
    team: "관리팀",
    roles: [{ title: "Lead", names: "김태우, 최수빈" }],
  },
  {
    team: "개발팀",
    roles: [
      { title: "Front End", names: "차영건, 강대훈" },
      { title: "Back End", names: "곽문수" },
      { title: "Infra", names: "신예준" },
    ],
  },
  {
    team: "디자인팀",
    roles: [
      { title: "Lead", names: "도현우" },
      { title: "Designer", names: "김강현" },
    ],
  },
];

export default function Credit() {
  return (
    <div className="w-full bg-white px-6.5 py-8">
      <div className="mb-8">
        <p className="text-[12px] font-medium text-[#7F8992]">
          상명대학교 26년도 대동제 웹사이트
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-[12px] font-medium text-[#7F8992] mb-1">Credits</h3>

        <div className="flex flex-col gap-6">
          {creditData.map((section, index) => (
            <div key={index} className="flex text-[12px]">
              <div className="w-20 shrink-0 font-semibold text-[#7F8992]">
                {section.team}
              </div>

              <div className="flex flex-col gap-2.5 flex-1">
                {section.roles.map((role, rIndex) => (
                  <div key={rIndex} className="flex">
                    <div className="w-22.5 shrink-0 font-semibold text-[#7F8992]">
                      {role.title}
                    </div>
                    <div className="text-[#7F8992]">{role.names}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
