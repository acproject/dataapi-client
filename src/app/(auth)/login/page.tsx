"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { useStore } from '@/store/useStore';

export default function LoginPage() {
    const { t } = useTranslation();
    const { isDarkMode } = useStore();

    const formSchema = z.object({
        username: z.string().min(1, t("form.placeholder.username")),
        password: z.string().min(1, t("form.placeholder.password")),
    })

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        // Todo: login logic    
        setLoading(false);
    };

    return (
        <div className={`${isDarkMode ? "dark" : ""} min-h-screen flex items-center justify-center bg-background`}>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle className='text-2xl text-center'>{t("form.title.login")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("form.label.username")}/{t("form.label.email")}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("form.label.password")}</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type='submit' className='w-full' disabled={loading}>
                                {loading ? t("status.signing") : t("form.button.login")}
                            </Button>
                            <div className='text-center text-sm'>
                                {t("form.text.dont_have_account")}
                                <Link href="/register" className=' text-primary hover:underline'>
                                    {t('form.text.sign_in_now')}</Link>
                            </div>
                        </form>

                    </Form>
                </CardContent>
            </Card>

        </div>
    );
}