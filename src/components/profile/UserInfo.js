export function UserInfo({ currentUser }) {
  return (
    <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
      <h1 className="text-3xl font-bold text-base-content">
        {currentUser?.username}
      </h1>
      <p className="text-sm font-medium text-base-content/70">
        {currentUser?.username}
      </p>
      <p className="text-sm text-base-content/70 mt-1">{currentUser?.bio}</p>
    </div>
  );
}
