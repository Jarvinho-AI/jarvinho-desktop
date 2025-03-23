import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function App() {
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-background text-foreground p-4", children: _jsx(Card, { className: "w-full max-w-md shadow-lg border", children: _jsxs(CardContent, { className: "p-6 text-center flex flex-col items-center gap-4", children: [_jsx("span", { className: "text-5xl", children: "\uD83D\uDEA7" }), _jsx("h1", { className: "text-2xl font-bold", children: "Jarvinho em constru\u00E7\u00E3o" }), _jsx("p", { className: "text-muted-foreground", children: "Essa interface ainda est\u00E1 sendo desenvolvida. Em breve voc\u00EA poder\u00E1 controlar seus dispositivos aqui." }), _jsx(Button, { variant: "outline", disabled: true, children: "Work in progress" })] }) }) }));
}
