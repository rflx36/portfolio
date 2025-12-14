



export default function LandingContacts() {
    return (
        <div className="absolute bottom-4 w-[calc(100%-2rem)] max-w-270 flex flex-col items-center">
            <div className="flex w-[calc(100%-4rem)] mx-8 gap-12 justify-center ">
                <div className="flex gap-3 p-2 font-semibold text-sm ease-bezier-in duration-150 cursor-pointer items-center text-text hover:text-accent-1">
                    <svg className="fill-current" width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 0H0V9C0 9.55228 0.447715 10 1 10H13C13.5523 10 14 9.55228 14 9V0ZM14 1.08319C14 1.44373 13.8059 1.77636 13.492 1.95376L7.48879 5.34676C7.18332 5.51941 6.80972 5.51933 6.50433 5.34655L0.507586 1.95384C0.193917 1.77638 0 1.44387 0 1.08348V0L6.46657 4.04363C6.7908 4.24637 7.20226 4.24647 7.52657 4.04387L14 0V1.08319Z" />
                    </svg>
                    <p className="text-current">rolandfonzlamoste3608@gmail.com</p>
                </div>
                <div className="flex gap-3 p-2 font-semibold text-sm ease-bezier-in duration-150 cursor-pointer items-center text-text hover:text-accent-1">
                    <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0C3.58214 0 0 3.675 0 8.20357C0 11.8286 2.29286 14.9 5.47143 15.9857C5.51601 15.9954 5.56152 16.0002 5.60714 16C5.90357 16 6.01786 15.7821 6.01786 15.5929C6.01786 15.3964 6.01071 14.8821 6.00714 14.1964C5.74251 14.2585 5.4718 14.2908 5.2 14.2929C3.66071 14.2929 3.31071 13.0964 3.31071 13.0964C2.94643 12.15 2.42143 11.8964 2.42143 11.8964C1.725 11.4071 2.41786 11.3929 2.47143 11.3929H2.475C3.27857 11.4643 3.7 12.2429 3.7 12.2429C4.1 12.9429 4.63571 13.1393 5.11429 13.1393C5.43073 13.133 5.74227 13.0599 6.02857 12.925C6.1 12.3964 6.30714 12.0357 6.53571 11.8286C4.76071 11.6214 2.89286 10.9179 2.89286 7.775C2.89286 6.87857 3.20357 6.14643 3.71429 5.575C3.63214 5.36786 3.35714 4.53214 3.79286 3.40357C3.8513 3.38959 3.91137 3.38358 3.97143 3.38571C4.26071 3.38571 4.91429 3.49643 5.99286 4.24643C7.30341 3.87975 8.68945 3.87975 10 4.24643C11.0786 3.49643 11.7321 3.38571 12.0214 3.38571C12.0815 3.38358 12.1416 3.38959 12.2 3.40357C12.6357 4.53214 12.3607 5.36786 12.2786 5.575C12.7893 6.15 13.1 6.88214 13.1 7.775C13.1 10.925 11.2286 11.6179 9.44643 11.8214C9.73214 12.075 9.98929 12.575 9.98929 13.3393C9.98929 14.4357 9.97857 15.3214 9.97857 15.5893C9.97857 15.7821 10.0893 16 10.3857 16C10.4337 16.0002 10.4816 15.9954 10.5286 15.9857C13.7107 14.9 16 11.825 16 8.20357C16 3.675 12.4179 0 8 0Z" />
                    </svg>
                    <p className="text-current">github.com/rflx36</p>
                </div>
                <div className="flex gap-3 p-2 font-bold text-sm ease-bezier-in duration-150 cursor-pointer items-center text-text hover:text-accent-1">
                    <svg className="stroke-current" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 10.25V12.25C0.75 13.3546 1.64543 14.25 2.75 14.25H12.75C13.8546 14.25 14.75 13.3546 14.75 12.25V10.25M7.75 11.75L4.25 8.75M7.75 11.75L11.25 8.75M7.75 11.75V0.75" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                    <p className="text-current">Download CV</p>
                </div>
            </div>
            <div className="w-full h-[0.0625rem] relative">
                <div className="bg-text/50 w-full h-full " />
                <div className=" bg-linear-to-r from-bg/0 to-bg w-[25%] max-w-32 h-2 z-10 absolute right-0 top-0 bottom-0 " />
                <div className=" bg-linear-to-r from-bg to-bg/0 w-[25%] max-w-32 h-2 z-10 absolute left-0 top-0 bottom-0 " />
            </div>
        </div>
    )
}