import {type MantineThemeOverride} from "@mantine/core"

export const theme : MantineThemeOverride = {
    colorScheme: 'light',
    defaultRadius: 'lg',
    headings: { fontFamily: 'Helvetica' },
    components: {
        Title: {
            defaultProps: {
                variant: 'gradient'
            }
        },
        Button: {
            defaultProps: {
                w: '50%',
                variant: 'gradient',
            }
        },
        Paper: {
            defaultProps: {
                shadow: 'xl',
                p: 'xl'
            }
        },
        SimpleGrid: {
            defaultProps: {
                cols: 3,
                spacing: 'xl',
                verticalSpacing: 'xl'
            }
        }
    }
}