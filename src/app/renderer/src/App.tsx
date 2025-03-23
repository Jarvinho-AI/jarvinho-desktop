import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <Card className="w-full max-w-md shadow-lg border">
        <CardContent className="p-6 text-center flex flex-col items-center gap-4">
          <span className="text-5xl">🚧</span>
          <h1 className="text-2xl font-bold">Jarvinho em construção</h1>
          <p className="text-muted-foreground">
            Essa interface ainda está sendo desenvolvida. Em breve você poderá controlar seus dispositivos aqui.
          </p>
          <Button variant="outline" disabled>
            Work in progress
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
