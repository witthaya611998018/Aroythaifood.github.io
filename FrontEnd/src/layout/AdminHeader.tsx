const AdminHeader = ({ onToggleSidebar }: { onToggleSidebar?: () => void }) => (
  <header className="h-20 bg-white border-b border-gray-200 flex items-center px-6 justify-between lg:py-6">
    <div className="flex flex-col items-center justify-between flex-grow lg:flex-row ">
      <div className="flex items-left justify-between w-full gap-2 px-2 py-2 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:border-b-0 lg:px-0 ">
        {/* Hamburger Button */}
        <button
          className="items-center  justify-center w-10 h-10 text-gray-400  rounded-lg border border-[#bcbbbb94] bg-gray-50 hover:bg-gray-100 lg:flex lg:h-11 lg:w-11 lg:border"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div className=" items-center justify-between w-full gap-2 px-2 py-2 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none">
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-gray-600">
            <svg width="20" height="20" fill="none" stroke="currentColor">
              <path d="M10 17a2 2 0 0 0 2-2H8a2 2 0 0 0 2 2zm6-5V9a6 6 0 1 0-12 0v3l-1.29 1.29A1 1 0 0 0 4 16h12a1 1 0 0 0 .71-1.71L16 12z" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium text-gray-700">Tom Cook</span>
            <svg width="16" height="16" fill="none" stroke="currentColor">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default AdminHeader;
