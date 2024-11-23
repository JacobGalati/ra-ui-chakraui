'use client';

import type { CollectionItem } from '@chakra-ui/react';
import { Select as ChakraSelect, Portal } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { CloseButton } from './close-button';

type SelectTriggerProps = {
    clearable?: boolean;
} & ChakraSelect.ControlProps;

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(function SelectTrigger(props, ref) {
    const { children, clearable, ...rest } = props;
    return (
        <ChakraSelect.Control {...rest}>
            <ChakraSelect.Trigger ref={ref}>{children}</ChakraSelect.Trigger>
            <ChakraSelect.IndicatorGroup>
                {clearable && <SelectClearTrigger />}
                <ChakraSelect.Indicator />
            </ChakraSelect.IndicatorGroup>
        </ChakraSelect.Control>
    );
});

const SelectClearTrigger = forwardRef<HTMLButtonElement, ChakraSelect.ClearTriggerProps>(
    function SelectClearTrigger(props, ref) {
        return (
            <ChakraSelect.ClearTrigger asChild {...props} ref={ref}>
                <CloseButton
                    size="xs"
                    variant="plain"
                    focusVisibleRing="inside"
                    focusRingWidth="2px"
                    pointerEvents="auto"
                />
            </ChakraSelect.ClearTrigger>
        );
    }
);

type SelectContentProps = {
    portalled?: boolean;
    portalRef?: React.RefObject<HTMLElement>;
} & ChakraSelect.ContentProps;

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props;
    return (
        <Portal disabled={!portalled} container={portalRef}>
            <ChakraSelect.Positioner>
                <ChakraSelect.Content {...rest} ref={ref} />
            </ChakraSelect.Positioner>
        </Portal>
    );
});

export const SelectItem = forwardRef<HTMLDivElement, ChakraSelect.ItemProps>(function SelectItem(props, ref) {
    const { item, children, ...rest } = props;
    return (
        <ChakraSelect.Item key={item.value} item={item} {...rest} ref={ref}>
            {children}
            <ChakraSelect.ItemIndicator />
        </ChakraSelect.Item>
    );
});

type SelectValueTextProps = {
    children?(items: CollectionItem[]): React.ReactNode;
} & Omit<ChakraSelect.ValueTextProps, 'children'>;

export const SelectValueText = forwardRef<HTMLSpanElement, SelectValueTextProps>(function SelectValueText(props, ref) {
    const { children, ...rest } = props;
    return (
        <ChakraSelect.ValueText {...rest} ref={ref}>
            <ChakraSelect.Context>
                {select => {
                    const items = select.selectedItems;
                    if (items.length === 0) return props.placeholder;
                    if (children) return children(items);
                    if (items.length === 1) return select.collection.stringifyItem(items[0]);
                    return `${items.length} selected`;
                }}
            </ChakraSelect.Context>
        </ChakraSelect.ValueText>
    );
});

export const SelectRoot = forwardRef<HTMLDivElement, ChakraSelect.RootProps>(function SelectRoot(props, ref) {
    return (
        <ChakraSelect.Root {...props} ref={ref} positioning={{ sameWidth: true, ...props.positioning }}>
            {props.asChild ? (
                props.children
            ) : (
                <>
                    <ChakraSelect.HiddenSelect />
                    {props.children}
                </>
            )}
        </ChakraSelect.Root>
    );
}) as ChakraSelect.RootComponent;

type SelectItemGroupProps = {
    label: React.ReactNode;
} & ChakraSelect.ItemGroupProps;

export const SelectItemGroup = forwardRef<HTMLDivElement, SelectItemGroupProps>(function SelectItemGroup(props, ref) {
    const { children, label, ...rest } = props;
    return (
        <ChakraSelect.ItemGroup {...rest} ref={ref}>
            <ChakraSelect.ItemGroupLabel>{label}</ChakraSelect.ItemGroupLabel>
            {children}
        </ChakraSelect.ItemGroup>
    );
});

export const SelectLabel = ChakraSelect.Label;
export const SelectItemText = ChakraSelect.ItemText;
