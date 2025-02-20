'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import '@/i18n';

export default function RegisterPage() {
    const { t } = useTranslation();

    const passwordMiniSize = 6;
    const formSchema = z.object({
        username: z.string().min(1, t("form.placeholder.username_not_null")),
        email: z.string().min(1, t("form.placeholder.email_not_null")).email(t("form.placeholder.email_not_valid")),
        organization: z.string().min(1, t("form.placeholder.organization_not_null")),
        phone: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        password: z.string().min(1, t("form.placeholder.password_less_x", { x: passwordMiniSize })),
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: t("form.placeholder.password_not_match"),
        path: ["confirmPassword"],
    });

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            organization: "",
            phone: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        // Todo: sign in logic    
        setLoading(false);
    };

    return (
        <div className='min-h-screen flex items-center justify-center p-4'>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle>{t("form.title.register")}</CardTitle>
                </CardHeader>
                {/* 必填字段 */}
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("form.label.username")}</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("form.label.email")}</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="organization"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("form.label.organization")}</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* 选填字段 */}
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("form.label.phone")}</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='grid grid-cols-2 gap-4'>
                                <FormField
                                    control={form.control}
                                    name='firstName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t("form.label.first_name")}</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='lastName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t("form.label.last_name")}</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("form.label.password")}</FormLabel>
                                        <FormControl><Input type='password' {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("form.label.confirm_password")}</FormLabel>
                                        <FormControl><Input type='password' {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' className='w-full' disabled={loading}>
                                {loading ? t("status.registering") : t("form.button.sign_in")}
                            </Button>

                            <div className='text-center text-sm'>
                                {t('form.text.have_account')} <Link href='/login' className='text-primary hover:underline'>
                                    {t('form.text.login_now')}</Link>
                            </div>

                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}