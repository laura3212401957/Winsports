import { useState, useEffect } from 'react'
import "./style.css"
import { Link } from 'react-router';

interface Ranking {
  rank: number
  contestantName: string
  points: number
  matchesPlayed: number
}

interface Estadistica {
  position: number
  name: string
  value: number
  appearances: number
  contestantName: string
  statName: string
}

type FiltroTipo = 'posiciones' | 'goleador' | 'asistencias' | 'amarillas' | 'atajadas'

const equiposMap: Record<string, string> = {
  "América de Cali SA": "america-de-cali",
  "CA Bucaramanga": "atletico-bucaramanga",
  "Club Atlético Nacional SA": "atletico-nacional",
  "Club Deportes Tolima SA": "deportes-tolima",
  "Asociación Deportivo Cali": "deportivo-cali",
  "Deportivo Independiente Medellín": "independiente-medellin",
  "Club Independiente Santa Fe": "independiente-santa-fe",
  "CD Popular Junior FC SA": "junior",
  "Millonarios FC": "millonarios",
  "Once Caldas SA": "once-caldas",
  "AD Pasto": "deportivo-pasto",
  "Internacional de Bogotá": "internacional-bogota",
  "Club Llaneros SA": "llaneros",
  "Águilas Doradas": "aguilas-doradas",
  "Fortaleza FC": "fortaleza",
  "Alianza FC": "alianza",
  "Jaguares de Córdoba FC": "jaguares",
  "Cúcuta Deportivo FC": "cucuta",
  "Boyacá Chicó FC": "boyaca-chico",
  "Deportivo Pereira FC": "pereira"
};

function Home() {
  const [ranking, setRanking] = useState<Ranking[]>([])
  const [title, setTitle] = useState('')

     //filtro
  const [filtro, setFiltro] = useState<FiltroTipo>('posiciones')
  const [estadisticas, setEstadisticas] = useState<Estadistica[]>([])

  const filtros: FiltroTipo[] = ['posiciones', 'goleador', 'asistencias', 'amarillas', 'atajadas']

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://raw.githubusercontent.com/sdtibata/dataliga/refs/heads/main/${filtro}.json')
        const data = await res.json() // toma los datos de la url y los guarda en formato json

         if (filtro === 'posiciones') {
          setRanking(data.standings[0].ranking)
          setTitle(data.standings[0].competitionName)
        } else {
          setEstadisticas(data)
        }
      } catch (error) {
        console.error('Error cargando datos:', error)
      }
    }

    fetchData()
  }, []) //se carga una vez

  return (
 <>
 <div className="filtros">
        {filtros.map((onestat) => (
          <button
            key={onestat}
            onClick={() => setFiltro(onestat)}
            className={filtro === onestat ? 'activo' : ''}
          >
            {onestat}
          </button>
        ))}
      </div>

    <div className="tabla-container">
      <h2>{title}</h2>
      <table className="tabla-posiciones">
        <thead>
          <tr>
            <th>#</th>
            <th>Equipo</th>
            <th>PJ</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((equipo) => (
            <tr key={equipo.rank}>
              <td>{equipo.rank}</td>
            <td>
              <Link to={`/equipo/${equiposMap[equipo.contestantName] || "default"}`}>
                        {equipo.contestantName}
                      </Link>
            </td>
              <td>{equipo.matchesPlayed}</td>
              <td>{equipo.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="tabla-estadisticas">
            <thead>
              <tr>
                <th>#</th>
                <th>Jugador</th>
                <th>Equipo</th>
                <th>PJ</th>
                <th>{filtro}</th>
              </tr>
            </thead>
            <tbody>
              {estadisticas.map((jugador, index) => (
                <tr key={index}
                >
                  <td>{jugador.position}</td>
                  <td>{jugador.name}</td>
                  <td>{jugador.contestantName}</td>
                  <td>{jugador.appearances}</td>
                  <td>{jugador.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </>
  )
}

export default Home