"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    UploadCloud,
    FileSpreadsheet,
    AlertTriangle,
    Zap,
    Swords,
    Scroll,
    Users,
    UserCog,
    CheckCircle2,
    Clock,
    Trophy,
    Sparkles,
    Star,
    Plus,
    ChevronRight,
    FileText,
    Award,
    Wand2,
    Brain,
} from "lucide-react";
import { AssignmentManager } from "@/components/faculty/academics/assignment-manager";
import { MarksEntry } from "@/components/faculty/academics/marks-entry";

// Mock data for grading
const pendingGrading: { id: number; name: string; class: string; assignment: string; submitted: string; score: number | null; bonusXP: number }[] = [
    { id: 1, name: 'Rahul Kumar', class: '10-A', assignment: 'Math Quiz 3', submitted: 'Dec 15', score: null, bonusXP: 0 },
    { id: 2, name: 'Priya Singh', class: '10-A', assignment: 'Math Quiz 3', submitted: 'Dec 15', score: null, bonusXP: 0 },
    { id: 3, name: 'Amit Patel', class: '10-A', assignment: 'Math Quiz 3', submitted: 'Dec 14', score: null, bonusXP: 0 },
    { id: 4, name: 'Neha Sharma', class: '10-A', assignment: 'Math Quiz 3', submitted: 'Dec 15', score: null, bonusXP: 0 },
    { id: 5, name: 'Vikram Singh', class: '10-A', assignment: 'Math Quiz 3', submitted: 'Dec 13', score: null, bonusXP: 0 },
];

const bonusReasons = [
    { value: 'neat', label: '✨ Neat Handwriting', xp: 10 },
    { value: 'creative', label: '💡 Creative Answer', xp: 15 },
    { value: 'extra', label: '🌟 Extra Effort', xp: 10 },
    { value: 'fast', label: '⚡ Quick Submission', xp: 5 },
    { value: 'improvement', label: '📈 Big Improvement', xp: 20 },
];

export default function FacultyAcademicsPage() {
    // Quiz Creator State
    const [quizStep, setQuizStep] = useState(1);
    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        assignmentType: 'whole-class', // whole-class or remedial
        selectedClass: '10-A',
        selectedStudents: [] as string[],
        xpReward: 50,
        questType: 'side-quest', // side-quest or boss-battle
        deadline: '',
        file: null as File | null,
        aiTopic: '', // For AI generation
    });

    // Grading State
    const [gradingItems, setGradingItems] = useState(pendingGrading);

    // Flaw 2 Fix: Bulk selection state for grading
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [bulkBonusReason, setBulkBonusReason] = useState<string>('');

    const handleScoreChange = (id: number, score: string) => {
        setGradingItems(prev => prev.map(item =>
            item.id === id ? { ...item, score: parseInt(score) || null } : item
        ));
    };

    // Toggle single student selection
    const toggleStudentSelection = (id: number) => {
        setSelectedStudents(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    // Select/Deselect all students
    const toggleSelectAll = () => {
        if (selectedStudents.length === gradingItems.length) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(gradingItems.map(item => item.id));
        }
    };

    // Bulk award XP to selected students
    const handleBulkAwardXP = (xp: number, reason: string) => {
        if (selectedStudents.length === 0) {
            alert('Please select at least one student first.');
            return;
        }

        setGradingItems(prev => prev.map(item =>
            selectedStudents.includes(item.id)
                ? { ...item, bonusXP: (item.bonusXP || 0) + xp }
                : item
        ));

        alert(`🎉 Bulk Bonus awarded!\n${selectedStudents.length} students received +${xp} XP for "${reason}"`);
        setSelectedStudents([]);
        setBulkBonusReason('');
    };

    const handleBonusXP = (id: number, xp: number, reason: string) => {
        setGradingItems(prev => prev.map(item =>
            item.id === id ? { ...item, bonusXP: (item.bonusXP || 0) + xp } : item
        ));
        const student = gradingItems.find(g => g.id === id);
        if (student) {
            alert(`Teacher Bonus awarded! ${student.name} received +${xp} XP for "${reason}"`);
        }
    };


    const handlePublishQuiz = () => {
        const questTypeLabel = quizData.questType === 'boss-battle' ? 'Boss Battle 🗡️' : 'Side Quest 📜';
        alert(`Quiz "${quizData.title}" published!\n\nType: ${questTypeLabel}\nXP Reward: ${quizData.xpReward} XP\nAssigned to: ${quizData.assignmentType === 'whole-class' ? quizData.selectedClass : 'Selected students'}`);
        setQuizStep(1);
        setQuizData({
            title: '',
            description: '',
            assignmentType: 'whole-class',
            selectedClass: '10-A',
            selectedStudents: [],
            xpReward: 50,
            questType: 'side-quest',
            deadline: '',
            file: null,
            aiTopic: '',
        });
    };

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Academics"
                title="Academics & Quizzes"
                subtitle="Create gamified assignments and grade with XP bonuses"
            />

            <Tabs defaultValue="create-quiz" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
                    <TabsTrigger value="create-quiz" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create Quiz
                    </TabsTrigger>
                    <TabsTrigger value="grade" className="gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Grade Now
                    </TabsTrigger>
                    <TabsTrigger value="assignments" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Assignments
                    </TabsTrigger>
                </TabsList>

                {/* Fix 6: Quiz Creator Tab */}
                <TabsContent value="create-quiz" className="space-y-6">
                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-2 p-4 bg-slate-50 rounded-xl">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center gap-2">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold transition-all ${quizStep >= step
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-slate-200 text-slate-500'
                                    }`}>
                                    {quizStep > step ? <CheckCircle2 className="h-5 w-5" /> : step}
                                </div>
                                <span className={`text-sm font-medium hidden sm:inline ${quizStep >= step ? 'text-blue-600' : 'text-slate-400'}`}>
                                    {step === 1 ? 'Upload/Create' : step === 2 ? 'Assign Students' : 'Gamification'}
                                </span>
                                {step < 3 && <ChevronRight className="h-4 w-4 text-slate-300" />}
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Upload/Create - Now with AI Generate as primary option! */}
                    {quizStep === 1 && (
                        <div className="space-y-6">
                            {/* Flaw 3 Fixed: AI Generate - The Killer Feature (Most Prominent) */}
                            <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 shadow-lg">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                                <Wand2 className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <span className="text-purple-700">✨ AI Generate</span>
                                                <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-indigo-500">Killer Feature</Badge>
                                            </div>
                                        </CardTitle>
                                    </div>
                                    <CardDescription className="text-purple-600/80">Let AI create quiz questions from any topic instantly</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-purple-700">Topic / Subject</Label>
                                            <Input
                                                placeholder="e.g., Thermodynamics, Algebra, Photosynthesis"
                                                className="bg-white border-purple-200 focus:border-purple-400"
                                                value={quizData.aiTopic}
                                                onChange={(e) => setQuizData(prev => ({ ...prev, aiTopic: e.target.value, title: `AI Quiz: ${e.target.value}` }))}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-purple-700">Class Level</Label>
                                            <Select
                                                value={quizData.selectedClass}
                                                onValueChange={(v) => setQuizData(prev => ({ ...prev, selectedClass: v }))}
                                            >
                                                <SelectTrigger className="bg-white border-purple-200">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="10-A">Class 10</SelectItem>
                                                    <SelectItem value="9-A">Class 9</SelectItem>
                                                    <SelectItem value="8-A">Class 8</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-purple-200">
                                        <Brain className="h-5 w-5 text-purple-500" />
                                        <span className="text-sm text-slate-600 flex-1">AI will generate 10 MCQ questions with answers and explanations</span>
                                    </div>
                                    <Button
                                        className="w-full h-12 text-base bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 gap-2 shadow-lg shadow-purple-500/30"
                                        onClick={() => {
                                            if (!quizData.aiTopic) {
                                                alert('Please enter a topic for AI generation.');
                                                return;
                                            }
                                            setQuizData(prev => ({ ...prev, title: `AI Quiz: ${prev.aiTopic}`, description: `Auto-generated quiz on ${prev.aiTopic} for Class ${prev.selectedClass}` }));
                                            setQuizStep(2);
                                        }}
                                        disabled={!quizData.aiTopic}
                                    >
                                        <Wand2 className="h-5 w-5" />
                                        Generate 10 Questions with AI
                                        <Sparkles className="h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>

                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-px bg-slate-200" />
                                <span className="text-sm text-slate-400">or choose manual options</span>
                                <div className="flex-1 h-px bg-slate-200" />
                            </div>

                            {/* Traditional Options Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <UploadCloud className="h-5 w-5 text-blue-500" />
                                            Upload Questions
                                        </CardTitle>
                                        <CardDescription>Upload Quiz via Excel or PDF file</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:bg-slate-50 transition-colors">
                                            <UploadCloud className="h-8 w-8 text-slate-300" />
                                            <p className="text-sm font-medium">Drop your file here</p>
                                            <p className="text-xs text-muted-foreground">Excel (.xlsx) or PDF supported</p>
                                            <Button variant="secondary" size="sm">Choose Files</Button>
                                        </div>
                                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 space-y-1">
                                            <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs">
                                                <FileSpreadsheet className="h-3 w-3" /> Download Template
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <Scroll className="h-5 w-5 text-emerald-500" />
                                            Create Manually
                                        </CardTitle>
                                        <CardDescription>Enter quiz details manually</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Quiz Title</Label>
                                            <Input
                                                placeholder="e.g., Algebra Basics Quiz"
                                                value={quizData.title}
                                                onChange={(e) => setQuizData(prev => ({ ...prev, title: e.target.value }))}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Description</Label>
                                            <Textarea
                                                placeholder="What this quiz covers..."
                                                className="h-20"
                                                value={quizData.description}
                                                onChange={(e) => setQuizData(prev => ({ ...prev, description: e.target.value }))}
                                            />
                                        </div>
                                        <Button
                                            className="w-full bg-emerald-500 hover:bg-emerald-600"
                                            onClick={() => setQuizStep(2)}
                                            disabled={!quizData.title}
                                        >
                                            Next: Assign Students <ChevronRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Assign Students */}
                    {quizStep === 2 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Users className="h-5 w-5 text-emerald-500" />
                                    Assign Students
                                </CardTitle>
                                <CardDescription>Select who should complete this quiz</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div
                                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${quizData.assignmentType === 'whole-class'
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                        onClick={() => setQuizData(prev => ({ ...prev, assignmentType: 'whole-class' }))}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                                <Users className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold">Whole Class</h4>
                                                <p className="text-xs text-muted-foreground">Assign to all students in a class</p>
                                            </div>
                                        </div>
                                        {quizData.assignmentType === 'whole-class' && (
                                            <Select
                                                value={quizData.selectedClass}
                                                onValueChange={(v) => setQuizData(prev => ({ ...prev, selectedClass: v }))}
                                            >
                                                <SelectTrigger className="mt-2">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="10-A">Class 10-A (42 students)</SelectItem>
                                                    <SelectItem value="10-B">Class 10-B (38 students)</SelectItem>
                                                    <SelectItem value="9-A">Class 9-A (45 students)</SelectItem>
                                                    <SelectItem value="9-B">Class 9-B (40 students)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </div>

                                    <div
                                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${quizData.assignmentType === 'remedial'
                                            ? 'border-amber-500 bg-amber-50'
                                            : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                        onClick={() => setQuizData(prev => ({ ...prev, assignmentType: 'remedial' }))}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">
                                                <UserCog className="h-6 w-6 text-amber-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold">Remedial Group</h4>
                                                <p className="text-xs text-muted-foreground">Select specific weak students</p>
                                            </div>
                                        </div>
                                        {quizData.assignmentType === 'remedial' && (
                                            <div className="mt-2 space-y-2">
                                                <p className="text-xs text-amber-600">5 at-risk students suggested</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {['Rahul K.', 'Amit P.', 'Vikram S.', 'Priya S.', 'Neha G.'].map(name => (
                                                        <Badge key={name} variant="outline" className="text-xs bg-amber-100 border-amber-300">
                                                            {name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={() => setQuizStep(1)}>
                                        Back
                                    </Button>
                                    <Button
                                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                                        onClick={() => setQuizStep(3)}
                                    >
                                        Next: Gamification Settings <ChevronRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 3: Gamification Settings (The Backstage!) */}
                    {quizStep === 3 && (
                        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-purple-500" />
                                    Gamification Settings
                                    <Badge className="bg-purple-500 ml-2">The Backstage</Badge>
                                </CardTitle>
                                <CardDescription>Configure XP rewards and quest type for student visibility</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                {/* XP Reward Slider */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="flex items-center gap-2">
                                            <Zap className="h-4 w-4 text-amber-500" />
                                            XP Reward
                                        </Label>
                                        <Badge className="bg-amber-500 text-lg px-3 py-1">
                                            {quizData.xpReward} XP
                                        </Badge>
                                    </div>
                                    <Slider
                                        value={[quizData.xpReward]}
                                        onValueChange={([value]) => setQuizData(prev => ({ ...prev, xpReward: value }))}
                                        min={20}
                                        max={100}
                                        step={5}
                                        className="py-4"
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>20 XP (Easy)</span>
                                        <span>60 XP (Medium)</span>
                                        <span>100 XP (Hard)</span>
                                    </div>
                                </div>

                                {/* Quest Type Toggle */}
                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2">
                                        <Trophy className="h-4 w-4 text-purple-500" />
                                        Quest Type
                                    </Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div
                                            className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${quizData.questType === 'side-quest'
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-slate-200 hover:border-slate-300 bg-white'
                                                }`}
                                            onClick={() => setQuizData(prev => ({ ...prev, questType: 'side-quest' }))}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                                    <Scroll className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold">Side Quest</h4>
                                                    <p className="text-xs text-muted-foreground">Small card on dashboard</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-blue-600 mt-3">
                                                📜 Standard visibility, appears in quest list
                                            </p>
                                        </div>

                                        <div
                                            className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${quizData.questType === 'boss-battle'
                                                ? 'border-rose-500 bg-rose-50'
                                                : 'border-slate-200 hover:border-slate-300 bg-white'
                                                }`}
                                            onClick={() => setQuizData(prev => ({ ...prev, questType: 'boss-battle' }))}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 rounded-xl bg-rose-100 flex items-center justify-center">
                                                    <Swords className="h-6 w-6 text-rose-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold">Boss Battle</h4>
                                                    <p className="text-xs text-muted-foreground">Big highlighted card!</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-rose-600 mt-3">
                                                ⚔️ High urgency, prominent placement with countdown
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Preview of how it will appear */}
                                <div className="bg-white rounded-xl border p-4">
                                    <p className="text-xs text-muted-foreground mb-3">Preview on Student Dashboard:</p>
                                    {quizData.questType === 'side-quest' ? (
                                        <div className="border rounded-lg p-3 flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                                <Scroll className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{quizData.title || 'Quiz Title'}</p>
                                                <p className="text-xs text-muted-foreground">{quizData.xpReward} XP • Due in 3 days</p>
                                            </div>
                                            <Badge variant="outline">Side Quest</Badge>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-rose-300 rounded-xl p-4 bg-gradient-to-br from-rose-50 to-orange-50">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-12 w-12 rounded-xl bg-rose-100 flex items-center justify-center animate-pulse">
                                                    <Swords className="h-6 w-6 text-rose-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-base font-bold text-rose-700">{quizData.title || 'Quiz Title'}</p>
                                                        <Badge className="bg-rose-500 animate-pulse">⚔️ BOSS BATTLE</Badge>
                                                    </div>
                                                    <p className="text-sm text-rose-600 font-medium">{quizData.xpReward} XP Reward!</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-rose-600">
                                                <Clock className="h-3 w-3" />
                                                <span className="font-mono font-bold">2d 14h 32m remaining</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={() => setQuizStep(2)}>
                                        Back
                                    </Button>
                                    <Button
                                        className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 gap-2"
                                        onClick={handlePublishQuiz}
                                    >
                                        <Sparkles className="h-4 w-4" />
                                        Publish Quest
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Flaw 2 Fixed: Grade Now Tab with Bulk Selection for XP */}
                <TabsContent value="grade" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                        Grade Submissions
                                    </CardTitle>
                                    <CardDescription>Grade and award bonus XP for exceptional work</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-amber-500">{gradingItems.length} Pending</Badge>
                                    {selectedStudents.length > 0 && (
                                        <Badge className="bg-blue-500">{selectedStudents.length} Selected</Badge>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Bulk Action Bar - Shows when students are selected */}
                            {selectedStudents.length > 0 && (
                                <div className="mb-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="h-5 w-5 text-amber-500" />
                                        <span className="font-semibold text-sm">{selectedStudents.length} students selected</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Select onValueChange={(v) => {
                                            const bonus = bonusReasons.find(b => b.value === v);
                                            if (bonus) handleBulkAwardXP(bonus.xp, bonus.label);
                                        }}>
                                            <SelectTrigger className="w-[180px] h-9 text-sm bg-white">
                                                <SelectValue placeholder="⭐ Bulk Award XP" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {bonusReasons.map(reason => (
                                                    <SelectItem key={reason.value} value={reason.value}>
                                                        {reason.label} (+{reason.xp})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setSelectedStudents([])}
                                            className="text-slate-500"
                                        >
                                            Clear Selection
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b text-left">
                                            {/* Select All Checkbox */}
                                            <th className="py-3 px-2 text-xs font-medium text-muted-foreground">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStudents.length === gradingItems.length && gradingItems.length > 0}
                                                    onChange={toggleSelectAll}
                                                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                />
                                            </th>
                                            <th className="py-3 px-2 text-xs font-medium text-muted-foreground">Student</th>
                                            <th className="py-3 px-2 text-xs font-medium text-muted-foreground">Assignment</th>
                                            <th className="py-3 px-2 text-xs font-medium text-muted-foreground">Submitted</th>
                                            <th className="py-3 px-2 text-xs font-medium text-muted-foreground">Score</th>
                                            <th className="py-3 px-2 text-xs font-medium text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Star className="h-3 w-3 text-amber-500" />
                                                    Award Bonus
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gradingItems.map((item) => (
                                            <tr key={item.id} className={`border-b hover:bg-slate-50 ${selectedStudents.includes(item.id) ? 'bg-blue-50' : ''}`}>
                                                {/* Checkbox */}
                                                <td className="py-3 px-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedStudents.includes(item.id)}
                                                        onChange={() => toggleStudentSelection(item.id)}
                                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="py-3 px-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium">
                                                            {item.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium">{item.name}</p>
                                                            <p className="text-[10px] text-muted-foreground">{item.class}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2 text-sm">{item.assignment}</td>
                                                <td className="py-3 px-2 text-xs text-muted-foreground">{item.submitted}</td>
                                                <td className="py-3 px-2">
                                                    <Input
                                                        type="number"
                                                        placeholder="Score"
                                                        className="w-20 h-8 text-sm"
                                                        min={0}
                                                        max={100}
                                                        value={item.score || ''}
                                                        onChange={(e) => handleScoreChange(item.id, e.target.value)}
                                                    />
                                                </td>
                                                <td className="py-3 px-2">
                                                    <div className="flex items-center gap-2">
                                                        <Select onValueChange={(v) => {
                                                            const bonus = bonusReasons.find(b => b.value === v);
                                                            if (bonus) handleBonusXP(item.id, bonus.xp, bonus.label);
                                                        }}>
                                                            <SelectTrigger className="w-[160px] h-8 text-xs">
                                                                <SelectValue placeholder="+ Bonus XP" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {bonusReasons.map(reason => (
                                                                    <SelectItem key={reason.value} value={reason.value}>
                                                                        {reason.label} (+{reason.xp})
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {item.bonusXP > 0 && (
                                                            <Badge className="bg-amber-500 text-xs">
                                                                +{item.bonusXP} XP
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Button className="bg-emerald-500 hover:bg-emerald-600 gap-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Save All Grades
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Assignments Tab */}
                <TabsContent value="assignments" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <AssignmentManager />
                        </div>

                        <div className="lg:col-span-1">
                            <MarksEntry />
                        </div>

                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base sm:text-lg">Upload Assignment Grades</CardTitle>
                                    <CardDescription className="text-sm">Upload grades via Excel or PDF file</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="border-2 border-dashed rounded-lg p-6 sm:p-10 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:bg-slate-50 transition-colors">
                                        <UploadCloud className="h-8 w-8 sm:h-10 sm:w-10 text-slate-300" />
                                        <p className="text-sm font-medium">Upload Grade File</p>
                                        <p className="text-xs text-muted-foreground">Drag and drop files here or click to browse</p>
                                        <Button variant="secondary" size="sm" className="mt-2">Choose Files</Button>
                                    </div>

                                    <div className="bg-rose-50 border border-rose-100 rounded-lg p-4 space-y-2">
                                        <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm">
                                            <AlertTriangle className="h-4 w-4" /> Template Format
                                        </div>
                                        <p className="text-xs text-rose-600/80">Download the template to ensure proper formatting</p>
                                        <Button variant="link" className="text-xs text-rose-600 h-auto p-0 underline">Download Template</Button>
                                    </div>

                                    <Button className="w-full bg-[#0f172a]">
                                        <FileSpreadsheet className="h-4 w-4 mr-2" /> Update Grades
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
