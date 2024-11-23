import { Alert as ChakraAlert } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { CloseButton } from './close-button';

export type AlertProps = {
    startElement?: React.ReactNode;
    endElement?: React.ReactNode;
    title?: React.ReactNode;
    icon?: React.ReactElement;
    closable?: boolean;
    onClose?: () => void;
} & Omit<ChakraAlert.RootProps, 'title'>;

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    const { title, children, icon, closable, onClose, startElement, endElement, ...rest } = props;
    return (
        <ChakraAlert.Root ref={ref} {...rest}>
            {startElement || <ChakraAlert.Indicator>{icon}</ChakraAlert.Indicator>}
            {children ? (
                <ChakraAlert.Content>
                    <ChakraAlert.Title>{title}</ChakraAlert.Title>
                    <ChakraAlert.Description>{children}</ChakraAlert.Description>
                </ChakraAlert.Content>
            ) : (
                <ChakraAlert.Title flex="1">{title}</ChakraAlert.Title>
            )}
            {endElement}
            {closable && (
                <CloseButton size="sm" pos="relative" top="-2" insetEnd="-2" alignSelf="flex-start" onClick={onClose} />
            )}
        </ChakraAlert.Root>
    );
});