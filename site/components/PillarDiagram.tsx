// Spec: 2026-05-17-nextjs-site-design.md §4.1 -- canonical, do not modify.
const DIAGRAM = `+----------------------------------------------------------+
|  shubham kaushal // shubhamkaushal765                    |
|                                                          |
|  parsers -> qubits.                                      |
|                                                          |
|     code intelligence ---bridge--- machine learning      |
|              \\                          /                |
|               \\                        /                 |
|                +------ bridge ------> quantum computing  |
|                                                          |
|  rust at the bottom. python at the top.                  |
+----------------------------------------------------------+`;

export default function PillarDiagram() {
  return <pre aria-label="Three pillars: code intelligence, machine learning, quantum computing, connected by bridges">{DIAGRAM}</pre>;
}
