import { Button } from '@mui/joy';
import Link from 'next/link';

interface CtaButtonProps {
  href: string;
  buttonText: string;
}

function CtaButton({ href, buttonText }: CtaButtonProps) {
  return (
    <Link href={href}>
      <Button
        variant="solid"
        size="lg"
        sx={{
          mt: 2,
          width: { xs: '40%', sm: '35%', md: '25%' },
          backgroundColor: '#FF7F50',
          color: '#fff',
          borderRadius: '50px',
          '&:hover': {
            backgroundColor: '#FF6347',
            transform: 'scale(1.05)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          },
          transition: 'all 0.3s ease',
          animation: 'fadeInUp 2s ease-in-out',
          '@keyframes fadeInUp': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        {buttonText}
      </Button>
    </Link>
  );
}

export default CtaButton;
