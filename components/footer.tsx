const Footer = () => {
    return (
        <footer className="bg-white border-t relative bottom-0 left-0 right-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 md:py-12">
                {/* Col 1 */}
                <div className="p-4">
                    <h3 className="text-2xl text-slate-900 mb-4 font-bold">
                        Tạp Hóa Thơm Trinh
                    </h3>
                    <p className="text-justify leading-7 text-slate-500">
                        Chúng tôi luôn cố gắng đem đến sự trải nghiệm tốt nhất
                        dành cho bạn.
                    </p>
                </div>

                {/* Col 2 */}
                <div className="p-4">
                    <h3 className="text-2xl text-slate-900 mb-4 font-bold">
                        Hỗ trợ
                    </h3>
                    <ul className="list-none p-0">
                        <li className="mb-2">
                            <a
                                href="/"
                                className="text-slate-500 hover:text-yellow-500"
                            >
                                F.A.Q
                            </a>
                        </li>

                        <li className="mb-2">
                            <a
                                href="/"
                                className="text-slate-500 hover:text-yellow-500"
                            >
                                Chính sách CSKH
                            </a>
                        </li>

                        <li className="mb-2">
                            <a
                                href="/"
                                className="text-slate-500 hover:text-yellow-500"
                            >
                                Dịch Vụ
                            </a>
                        </li>

                        <li className="mb-2">
                            <a
                                href="/"
                                className="text-slate-500 hover:text-yellow-500"
                            >
                                Hỗ trợ
                            </a>
                        </li>

                        <li>
                            <a
                                href="/"
                                className="text-slate-500 hover:text-yellow-500"
                            >
                                Tuyển dụng
                            </a>
                        </li>
                    </ul>
                </div>

                {/* col 3 */}
                <div className="p-4">
                    <h3 className="text-2xl text-slate-900 mb-4 font-bold">
                        Liên Hệ
                    </h3>
                    <ul className="list-none pb-4">
                        <li className="flex items-center mb-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="gray"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            <p className="text-slate-500 ml-2">
                                {" "}
                                +84 974765301
                            </p>
                        </li>

                        <li className="flex items-center mb-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="gray"
                                className="w-6 h-6"
                            >
                                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                            </svg>
                            <p className="text-slate-500 ml-2">
                                {" "}
                                thuanminh.2001286@gmail.com
                            </p>
                        </li>

                        <li className="flex items-center mb-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="gray"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className="text-slate-500 ml-2">
                                {" "}
                                437, DH 507, Tân Hiệp, Phú Giáo, Bình Dương
                            </p>
                        </li>
                    </ul>

                    {/* Social media */}
                    <div className="flex flex-wrap justify-start gap-2">
                        {/* Social media buttons */}
                        <button className="bg-blue-500 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                            <svg
                                className="w-5 h-5 fill-current"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </button>

                        <button className="bg-blue-400 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                            <svg
                                className="w-5 h-5 fill-current"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                        </button>

                        <button className="bg-pink-600 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                            <svg
                                className="w-5 h-5 fill-current"
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                            </svg>
                        </button>

                        <button className="bg-blue-600 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                            <svg
                                className="w-5 h-5 fill-current"
                                role="img"
                                viewBox="0 0 256 256"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g>
                                    <path d="M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055"></path>
                                </g>
                            </svg>
                        </button>

                        <button className="bg-red-600 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                            <svg
                                className="w-5 h-5 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mx-auto py-10">
                <p className="text-center text-xs text-black">
                    Copyright &copy; 2023 Coding Artist | All Rights Reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;
