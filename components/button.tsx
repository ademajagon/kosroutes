type ButtonProps = {
  type?: "button" | "submit";
  children: React.ReactNode;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
};

function Button({ children, type, disabled, href, onClick }: ButtonProps) {
  const classes =
    "rounded-full px-4 py-2 text-[15px] font-semibold text-forest bg-button hover:bg-button-hover disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-150 hover:cursor-default";
  if (onClick && !href) {
    return (
      <button
        className={classes}
        type={type === "submit" ? "submit" : "button"}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" onClick={onClick} className={classes}>
      {children}
    </a>
  );
}

export default Button;
