'use client';

import type { ButtonProps } from '@chakra-ui/react';
import { Button, Toggle as ChakraToggle, useToggleContext } from '@chakra-ui/react';
import { forwardRef } from 'react';

type ToggleProps = {
    variant?: keyof typeof variantMap;
    size?: ButtonProps['size'];
} & ChakraToggle.RootProps;

const variantMap = {
    solid: { on: 'solid', off: 'outline' },
    surface: { on: 'surface', off: 'outline' },
    subtle: { on: 'subtle', off: 'ghost' },
    ghost: { on: 'subtle', off: 'ghost' },
} as const;

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(props, ref) {
    const { variant = 'subtle', size, children, ...rest } = props;
    const variantConfig = variantMap[variant];

    return (
        <ChakraToggle.Root asChild {...rest}>
            <ToggleBaseButton size={size} variant={variantConfig} ref={ref}>
                {children}
            </ToggleBaseButton>
        </ChakraToggle.Root>
    );
});

type ToggleBaseButtonProps = {
    variant: Record<'on' | 'off', ButtonProps['variant']>;
} & Omit<ButtonProps, 'variant'>;

const ToggleBaseButton = forwardRef<HTMLButtonElement, ToggleBaseButtonProps>(function ToggleBaseButton(props, ref) {
    const toggle = useToggleContext();
    const { variant, ...rest } = props;
    return <Button variant={toggle.pressed ? variant.on : variant.off} ref={ref} {...rest} />;
});

export const ToggleIndicator = ChakraToggle.Indicator;
