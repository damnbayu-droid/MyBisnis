'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Lock, Bell, Moon, Languages } from 'lucide-react'

interface SettingsModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-slate-900 border-slate-700 text-slate-200 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white">Settings & Privacy</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Manage your account preferences and privacy settings.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="general" className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
                    </TabsList>

                    {/* General Settings */}
                    <TabsContent value="general" className="space-y-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Moon className="w-5 h-5 text-slate-400" />
                                <div>
                                    <Label className="text-base font-medium">Dark Mode</Label>
                                    <p className="text-xs text-slate-500">Enable dark theme (Default)</p>
                                </div>
                            </div>
                            <Switch checked={true} disabled />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Bell className="w-5 h-5 text-slate-400" />
                                <div>
                                    <Label className="text-base font-medium">Notifications</Label>
                                    <p className="text-xs text-slate-500">Receive order & system alerts</p>
                                </div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Languages className="w-5 h-5 text-slate-400" />
                                <div>
                                    <Label className="text-base font-medium">Language</Label>
                                    <p className="text-xs text-slate-500">Switch ID/EN via Header</p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Privacy Settings */}
                    <TabsContent value="privacy" className="space-y-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Lock className="w-5 h-5 text-amber-500" />
                                <div>
                                    <Label className="text-base font-medium">Private Profile</Label>
                                    <p className="text-xs text-slate-500">Hide stats from public</p>
                                </div>
                            </div>
                            <Switch />
                        </div>
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg mt-4">
                            <h4 className="text-red-400 font-bold text-sm mb-1">Delete Account</h4>
                            <p className="text-xs text-slate-400 mb-3">
                                Permanently delete your account and all data. This action cannot be undone.
                            </p>
                            <Button variant="destructive" size="sm" className="w-full">Request Deletion</Button>
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter>
                    <Button variant="secondary" onClick={onClose} className="bg-slate-800 hover:bg-slate-700 text-white">Close</Button>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
