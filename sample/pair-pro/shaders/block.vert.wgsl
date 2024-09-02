struct Offset {
  x: f32,
  y: f32,
}

struct Uniforms {
  offset: Offset,
}

@group(0) @binding(0) var<uniform> uniforms : Uniforms;

@vertex
fn main(
  @builtin(vertex_index) VertexIndex : u32
) -> @builtin(position) vec4f {

  var pos = array<vec2f, 4>(
    vec2(-1 + uniforms.offset.x, -0.9 + uniforms.offset.y),
    vec2(-0.9 + uniforms.offset.x, -0.9 + uniforms.offset.y),
    vec2(-1 + uniforms.offset.x, -1 + uniforms.offset.y),
    vec2(-0.9 + uniforms.offset.x, -1 + uniforms.offset.y),
  );
  
  return vec4f(pos[VertexIndex], 0.0, 1.0);
}
