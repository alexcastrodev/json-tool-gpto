import { Button, Textarea, Title, Grid, Container, Group, Paper, Text } from '@mantine/core';
import { useState } from 'react';
import "@mantine/core/styles.css"
export default function App() {
  const [jsonInput1, setJsonInput1] = useState('');
  const [jsonOutput1, setJsonOutput1] = useState('');
  const [jsonInput2, setJsonInput2] = useState('');
  const [interfaceOutput, setInterfaceOutput] = useState('');

  const prettifyJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput1);
      setJsonOutput1(JSON.stringify(parsed, null, 2));
    } catch (e) {
      alert('Invalid JSON');
    }
  };

  const transformToInterface = () => {
    try {
      const json = JSON.parse(jsonInput2);
      const output = jsonToInterface(json);
      setInterfaceOutput(output);
    } catch (e) {
      alert('Invalid JSON');
    }
  };

  function jsonToInterface(obj, name = 'RootObject') {
    const seen = new Set();
    function parse(obj, indent = '  ') {
      if (obj === null) return 'any';
      if (Array.isArray(obj)) {
        const type = obj.length ? parse(obj[0], indent) : 'any';
        return `${type}[]`;
      }
      if (typeof obj === 'object') {
        if (seen.has(obj)) return 'any';
        seen.add(obj);
        let result = '{\n';
        for (const key in obj) {
          result += `${indent}${key}: ${parse(obj[key], indent + '  ')};\n`;
        }
        result += indent.slice(2) + '}';
        return result;
      }
      return typeof obj;
    }
    return `interface ${name} ${parse(obj)}`;
  }

  return (
    <Container size="xl" py="xl">
      <Title order={2} mb="md" align="center">
        JSON Tools
      </Title>

      <Paper shadow="md" radius="md" p="md" mb="xl" withBorder>
        <Text size="lg" weight={500} mb="sm">Prettify JSON</Text>
        <Grid>
          <Grid.Col span={6}>
            <Textarea
              label="Input JSON"
              placeholder="Paste raw JSON here"
              minRows={10}
              value={jsonInput1}
              onChange={(e) => setJsonInput1(e.target.value)}
              autosize
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Textarea
              label="Formatted JSON"
              placeholder="Formatted output will appear here"
              minRows={10}
              value={jsonOutput1}
              readOnly
              autosize
            />
          </Grid.Col>
        </Grid>
        <Group mt="md" position="center">
          <Button onClick={prettifyJSON}>Prettier</Button>
        </Group>
      </Paper>

      <Paper shadow="md" radius="md" p="md" withBorder>
        <Text size="lg" weight={500} mb="sm">Transform to TypeScript Interface</Text>
        <Grid>
          <Grid.Col span={6}>
            <Textarea
              label="Input JSON"
              placeholder="Paste raw JSON here"
              minRows={10}
              value={jsonInput2}
              onChange={(e) => setJsonInput2(e.target.value)}
              autosize
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Textarea
              label="TypeScript Interface"
              placeholder="TS Interface will appear here"
              minRows={10}
              value={interfaceOutput}
              readOnly
              autosize
            />
          </Grid.Col>
        </Grid>
        <Group mt="md" position="center">
          <Button onClick={transformToInterface} color="teal">Transform</Button>
        </Group>
      </Paper>
    </Container>
  );
}
